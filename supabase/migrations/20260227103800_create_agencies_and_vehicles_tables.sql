/*
  # Création des tables agencies, vehicles et reviews

  1. Nouvelles Tables
    - `agencies` - Agences Activ Automobiles
      - `id` (text, primary key) - Identifiant unique
      - `slug` (text, unique) - URL slug
      - `name` (text) - Nom de l'agence
      - `city` (text) - Ville
      - `address` (text) - Adresse
      - `zip_code` (text) - Code postal
      - `phone` (text) - Téléphone
      - `email` (text) - Email
      - `description` (text) - Description
      - `image` (text) - URL image
      - `lat` (numeric) - Latitude
      - `lng` (numeric) - Longitude
      - `opening_hours` (jsonb) - Horaires d'ouverture
      - `services` (text[]) - Liste des services
      - `rating` (numeric) - Note moyenne
      - `review_count` (integer) - Nombre d'avis
      - `created_at` (timestamptz) - Date de création
      - `updated_at` (timestamptz) - Date de mise à jour

    - `vehicles` - Véhicules d'occasion
      - `id` (text, primary key) - Identifiant unique
      - `slug` (text, unique) - URL slug
      - `brand` (text) - Marque
      - `model` (text) - Modèle
      - `version` (text) - Version
      - `year` (integer) - Année
      - `mileage` (integer) - Kilométrage
      - `price` (integer) - Prix
      - `monthly_price` (integer) - Prix mensuel
      - `fuel` (text) - Type de carburant
      - `transmission` (text) - Type de transmission
      - `body_type` (text) - Type de carrosserie
      - `condition` (text) - État
      - `color` (text) - Couleur
      - `doors` (integer) - Nombre de portes
      - `seats` (integer) - Nombre de places
      - `power` (integer) - Puissance (ch)
      - `co2` (integer) - Émissions CO2
      - `description` (text) - Description
      - `images` (jsonb) - Images
      - `agency_id` (text) - ID de l'agence
      - `agency_city` (text) - Ville de l'agence
      - `available` (boolean) - Disponible
      - `featured` (boolean) - Mis en avant
      - `options` (text[]) - Options
      - `vin` (text) - Numéro VIN
      - `dtp` (text) - DTP
      - `created_at` (timestamptz) - Date de création
      - `updated_at` (timestamptz) - Date de mise à jour

    - `reviews` - Avis clients
      - `id` (text, primary key) - Identifiant unique
      - `author` (text) - Auteur
      - `rating` (integer) - Note (1-5)
      - `comment` (text) - Commentaire
      - `agency_id` (text) - ID de l'agence
      - `date` (timestamptz) - Date de l'avis
      - `source` (text) - Source (google, etc.)
      - `visited_at` (text) - Date de visite
      - `reviewer_details` (text) - Détails du reviewer
      - `created_at` (timestamptz) - Date de création

  2. Sécurité
    - Enable RLS on all tables
    - Add policies for public read access (these are public listings)
*/

-- Create agencies table
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agencies_slug ON agencies(slug);
CREATE INDEX IF NOT EXISTS idx_agencies_city ON agencies(city);
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_model ON vehicles(model);
CREATE INDEX IF NOT EXISTS idx_vehicles_fuel ON vehicles(fuel);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price);
CREATE INDEX IF NOT EXISTS idx_vehicles_agency_id ON vehicles(agency_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured);
CREATE INDEX IF NOT EXISTS idx_reviews_agency_id ON reviews(agency_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Enable Row Level Security
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (these are public listings)
CREATE POLICY "Agencies are viewable by everyone"
  ON agencies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Vehicles are viewable by everyone"
  ON vehicles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  TO public
  USING (true);

-- Policies for authenticated users to manage data (admin only in practice)
CREATE POLICY "Authenticated users can insert agencies"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update agencies"
  ON agencies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete agencies"
  ON agencies FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (true);
