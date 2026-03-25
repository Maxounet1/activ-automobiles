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

async function seedBlogPosts() {
  try {
    const blogDataPath = join(__dirname, '..', 'lib', 'data', 'blog.json');
    const blogData = JSON.parse(readFileSync(blogDataPath, 'utf-8'));

    console.log(`Found ${blogData.length} blog posts to seed`);

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

    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(blogPosts, { onConflict: 'id' });

    if (error) {
      console.error('Error seeding blog posts:', error);
      process.exit(1);
    }

    console.log(`Successfully seeded ${blogPosts.length} blog posts`);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seedBlogPosts();
