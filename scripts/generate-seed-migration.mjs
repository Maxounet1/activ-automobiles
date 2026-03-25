import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read blog data
const blogDataPath = join(__dirname, '..', 'lib', 'data', 'blog.json');
const blogData = JSON.parse(readFileSync(blogDataPath, 'utf-8'));

// Read agencies data
const agenciesDataPath = join(__dirname, '..', 'lib', 'data', 'agencies.json');
const agenciesData = JSON.parse(readFileSync(agenciesDataPath, 'utf-8'));

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

function arrayToSQL(arr) {
  if (!arr || arr.length === 0) return "ARRAY[]::text[]";
  return `ARRAY[${arr.map(item => escapeSQL(item)).join(', ')}]`;
}

function jsonToSQL(obj) {
  return escapeSQL(JSON.stringify(obj)) + '::jsonb';
}

console.log('Generating seed migration...');
console.log(`Blog posts: ${blogData.length}`);
console.log(`Agencies: ${agenciesData.length}`);

// Generate blog inserts in chunks
const blogChunks = [];
const chunkSize = 5;

for (let i = 0; i < blogData.length; i += chunkSize) {
  const chunk = blogData.slice(i, i + chunkSize);
  const values = chunk.map(post => {
    return `  (${escapeSQL(post.id)}, ${escapeSQL(post.slug)}, ${escapeSQL(post.title)}, ${escapeSQL(post.excerpt)}, ${escapeSQL(post.content)}, ${escapeSQL(post.author)}, ${escapeSQL(post.category)}, ${arrayToSQL(post.tags)}, ${escapeSQL(post.image)}, ${escapeSQL(post.publishedAt)}, ${post.readTime}, ${post.featured})`;
  }).join(',\n');

  blogChunks.push(`
INSERT INTO blog_posts (id, slug, title, excerpt, content, author, category, tags, image, published_at, read_time, featured)
VALUES
${values}
ON CONFLICT (id) DO NOTHING;
`);
}

// Generate agency inserts
const agencyValues = agenciesData.map(agency => {
  return `  (${escapeSQL(agency.id)}, ${escapeSQL(agency.slug)}, ${escapeSQL(agency.name)}, ${escapeSQL(agency.city)}, ${escapeSQL(agency.address)}, ${escapeSQL(agency.zipCode)}, ${escapeSQL(agency.phone)}, ${escapeSQL(agency.email)}, ${escapeSQL(agency.description)}, ${escapeSQL(agency.image)}, ${agency.lat}, ${agency.lng}, ${jsonToSQL(agency.openingHours)}, ${arrayToSQL(agency.services)}, ${agency.rating}, ${agency.reviewCount})`;
}).join(',\n');

const agencyInsert = `
INSERT INTO agencies (id, slug, name, city, address, zip_code, phone, email, description, image, lat, lng, opening_hours, services, rating, review_count)
VALUES
${agencyValues}
ON CONFLICT (id) DO NOTHING;
`;

// Combine all
const migration = `/*
  # Seed blog posts and agencies data

  This migration populates the blog_posts and agencies tables with initial data.

  - ${blogData.length} blog posts
  - ${agenciesData.length} agencies
*/

${blogChunks.join('\n')}

${agencyInsert}
`;

const outputPath = join(__dirname, '..', 'seed-data.sql');
writeFileSync(outputPath, migration, 'utf-8');

console.log(`Migration written to: ${outputPath}`);
console.log(`Total size: ${(migration.length / 1024).toFixed(2)} KB`);
