import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAgencies() {
  try {
    const agenciesDataPath = join(__dirname, '..', 'lib', 'data', 'agencies.json');
    const agenciesData = JSON.parse(readFileSync(agenciesDataPath, 'utf-8'));

    console.log(`Found ${agenciesData.length} agencies to seed`);

    const agencies = agenciesData.map(agency => ({
      id: agency.id,
      slug: agency.slug,
      name: agency.name,
      city: agency.city,
      address: agency.address,
      zip_code: agency.zipCode,
      phone: agency.phone,
      email: agency.email,
      description: agency.description,
      image: agency.image,
      lat: agency.lat,
      lng: agency.lng,
      opening_hours: agency.openingHours,
      services: agency.services,
      rating: agency.rating,
      review_count: agency.reviewCount,
    }));

    const { data, error } = await supabase
      .from('agencies')
      .upsert(agencies, { onConflict: 'id' });

    if (error) {
      console.error('Error seeding agencies:', error);
      process.exit(1);
    }

    console.log(`Successfully seeded ${agencies.length} agencies`);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seedAgencies();
