import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const blogDataPath = join(__dirname, '..', 'lib', 'data', 'blog.json');
const blogData = JSON.parse(readFileSync(blogDataPath, 'utf-8'));

async function insertBatch(records, tableName, transform) {
  const url = `${supabaseUrl}/rest/v1/${tableName}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Prefer': 'resolution=ignore-duplicates'
    },
    body: JSON.stringify(records.map(transform))
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return response;
}

async function seedBlogPosts() {
  console.log(`Seeding ${blogData.length} blog posts...`);

  const batchSize = 10;
  for (let i = 0; i < blogData.length; i += batchSize) {
    const batch = blogData.slice(i, i + batchSize);

    try {
      await insertBatch(batch, 'blog_posts', post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        tags: post.tags,
        image: post.image,
        published_at: post.publishedAt,
        read_time: post.readTime,
        featured: post.featured,
      }));

      console.log(`✓ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(blogData.length / batchSize)} (${batch.length} posts)`);
    } catch (err) {
      console.error(`✗ Error on batch ${Math.floor(i / batchSize) + 1}:`, err.message);
    }
  }

  console.log('Blog posts seeding completed!');
}

seedBlogPosts().catch(console.error);
