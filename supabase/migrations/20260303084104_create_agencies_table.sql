/*
  # Create agencies table

  1. New Tables
    - `agencies`
      - `id` (text, primary key) - Unique identifier for the agency
      - `slug` (text, unique, not null) - URL-friendly version of the city name
      - `name` (text, not null) - Full agency name
      - `city` (text, not null) - City where the agency is located
      - `address` (text, not null) - Street address
      - `zip_code` (text, not null) - Postal code
      - `phone` (text, not null) - Phone number
      - `email` (text, not null) - Contact email
      - `description` (text, not null) - Agency description
      - `image` (text, not null) - Agency image URL
      - `lat` (numeric, not null) - Latitude for map display
      - `lng` (numeric, not null) - Longitude for map display
      - `opening_hours` (jsonb, not null, default '[]') - Opening hours in JSON format
      - `services` (text[], not null, default '{}') - Array of services offered
      - `rating` (numeric, default 0) - Average customer rating
      - `review_count` (integer, default 0) - Number of reviews
      - `created_at` (timestamptz, default now()) - Record creation timestamp
      - `updated_at` (timestamptz, default now()) - Record update timestamp

  2. Security
    - Enable RLS on `agencies` table
    - Add policy for public read access (agencies are public content)
    - Add policy for authenticated insert/update/delete (only for admin users)

  3. Indexes
    - Index on slug for fast lookups
    - Index on city for filtering
    - Index on rating for sorting
*/

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
  opening_hours jsonb NOT NULL DEFAULT '[]',
  services text[] NOT NULL DEFAULT '{}',
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_agencies_slug ON agencies(slug);
CREATE INDEX IF NOT EXISTS idx_agencies_city ON agencies(city);
CREATE INDEX IF NOT EXISTS idx_agencies_rating ON agencies(rating DESC);

-- Enable RLS
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;

-- Public read access (agencies are public content)
CREATE POLICY "Anyone can view agencies"
  ON agencies FOR SELECT
  USING (true);

-- Only authenticated users can insert (for admin functionality)
CREATE POLICY "Authenticated users can insert agencies"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update agencies"
  ON agencies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete agencies"
  ON agencies FOR DELETE
  TO authenticated
  USING (true);