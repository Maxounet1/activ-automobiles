import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

// Read the full SQL file
const sqlPath = join(__dirname, '..', 'seed-data.sql');
const fullSQL = readFileSync(sqlPath, 'utf-8');

// Execute via direct SQL API call
async function executeSeedSQL() {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ query: fullSQL })
    });

    if (!response.ok) {
      // If RPC doesn't work, we'll use the migrations approach
      console.log('Direct SQL execution not available, data will be seeded via migration');
      console.log('Run: node scripts/seed-via-api.mjs');
      process.exit(0);
    }

    const result = await response.json();
    console.log('Seed completed successfully!', result);
  } catch (err) {
    console.error('Error:', err.message);
    console.log('Please run the complete seeding via API script');
  }
}

executeSeedSQL();
