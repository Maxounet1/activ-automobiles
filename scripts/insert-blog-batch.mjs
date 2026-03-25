import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertBlogPosts() {
  try {
    const blogDataPath = join(__dirname, '..', 'lib', 'data', 'blog.json');
    const blogData = JSON.parse(readFileSync(blogDataPath, 'utf-8'));

    console.log(`Preparing ${blogData.length} blog posts for insertion`);

    const blogPosts = blogData.map(post => ({
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

    // Insert in batches of 10
    const batchSize = 10;
    for (let i = 0; i < blogPosts.length; i += batchSize) {
      const batch = blogPosts.slice(i, i + batchSize);

      const values = batch.map(post => `(
        '${post.id.replace(/'/g, "''")}',
        '${post.slug.replace(/'/g, "''")}',
        '${post.title.replace(/'/g, "''")}',
        '${post.excerpt.replace(/'/g, "''")}',
        '${post.content.replace(/'/g, "''").replace(/\\/g, '\\\\')}',
        '${post.author.replace(/'/g, "''")}',
        '${post.category.replace(/'/g, "''")}',
        ARRAY[${post.tags.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')}],
        '${post.image.replace(/'/g, "''")}',
        '${post.published_at}',
        ${post.read_time},
        ${post.featured}
      )`).join(',');

      const sql = `
        INSERT INTO blog_posts (id, slug, title, excerpt, content, author, category, tags, image, published_at, read_time, featured)
        VALUES ${values}
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          author = EXCLUDED.author,
          category = EXCLUDED.category,
          tags = EXCLUDED.tags,
          image = EXCLUDED.image,
          published_at = EXCLUDED.published_at,
          read_time = EXCLUDED.read_time,
          featured = EXCLUDED.featured,
          updated_at = now();
      `;

      const { error } = await supabase.rpc('exec_sql', { query: sql }).catch(() => {
        // Try direct execute_sql if rpc fails
        return supabase.from('blog_posts').insert(batch);
      });

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`Inserted batch ${i / batchSize + 1} (${batch.length} posts)`);
      }
    }

    console.log('Blog posts insertion completed');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

insertBlogPosts();
