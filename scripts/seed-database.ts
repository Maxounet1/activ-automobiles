import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  const agenciesPath = path.join(__dirname, '../lib/data/agencies.json');
  const reviewsPath = path.join(__dirname, '../lib/data/reviews.json');

  const agencies = JSON.parse(fs.readFileSync(agenciesPath, 'utf-8'));
  const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'));

  console.log(`📍 Inserting ${agencies.length} agencies...`);
  const agenciesData = agencies.map((agency: any) => ({
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

  const { error: agenciesError } = await supabase
    .from('agencies')
    .upsert(agenciesData, { onConflict: 'id' });

  if (agenciesError) {
    console.error('❌ Error inserting agencies:', agenciesError);
  } else {
    console.log('✅ Agencies inserted successfully');
  }

  console.log(`\n⭐ Inserting ${reviews.length} reviews...`);
  const reviewsData = reviews.map((review: any) => ({
    id: review.id,
    author: review.author,
    rating: review.rating,
    comment: review.comment,
    agency_id: review.agencyId,
    date: review.date,
    source: review.source,
    visited_at: review.visitedAt,
    reviewer_details: review.reviewerDetails,
  }));

  const { error: reviewsError } = await supabase
    .from('reviews')
    .upsert(reviewsData, { onConflict: 'id' });

  if (reviewsError) {
    console.error('❌ Error inserting reviews:', reviewsError);
  } else {
    console.log('✅ Reviews inserted successfully');
  }

  console.log('\n✨ Database seeding completed!');
}

seedDatabase().catch(console.error);
