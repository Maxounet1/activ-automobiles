import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vzdswkyznpczbnoizcqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZHN3a3l6bnBjemJub2l6Y3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzk4NjMsImV4cCI6MjA4Nzc1NTg2M30.nV8x2fiF9FGA69toEWBBLObJGwDriiM8VUIkf1Yvjfw';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Vérification des données Supabase...\n');

const { data: agencies, error: agenciesError } = await supabase.from('agencies').select('*').order('name');

if (agenciesError) {
  console.error('❌ Erreur agencies:', agenciesError);
} else {
  console.log(`✅ ${agencies.length} agences trouvées:`);
  agencies.forEach(a => {
    console.log(`   - ${a.name} (${a.city}) - ${a.rating}/5 (${a.review_count} avis)`);
  });
}

console.log('');

const { data: vehicles, error: vehiclesError } = await supabase.from('vehicles').select('*');

if (vehiclesError) {
  console.error('❌ Erreur vehicles:', vehiclesError);
} else {
  console.log(`✅ ${vehicles.length} véhicules trouvés`);

  const byAgency = {};
  vehicles.forEach(v => {
    if (!byAgency[v.agency_city]) byAgency[v.agency_city] = 0;
    byAgency[v.agency_city]++;
  });

  console.log('\nPar agence:');
  Object.entries(byAgency).forEach(([city, count]) => {
    console.log(`   - ${city}: ${count} véhicules`);
  });
}

console.log('');

const { data: reviews, error: reviewsError } = await supabase.from('reviews').select('*');

if (reviewsError) {
  console.error('❌ Erreur reviews:', reviewsError);
} else {
  console.log(`✅ ${reviews.length} avis trouvés`);

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  console.log(`   Note moyenne: ${avgRating.toFixed(1)}/5`);
}

console.log('\n✨ Vérification terminée !');
