import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blogDataPath = join(__dirname, '..', 'lib', 'data', 'blog.json');
const blogData = JSON.parse(readFileSync(blogDataPath, 'utf-8'));

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

function arrayToSQL(arr) {
  if (!arr || arr.length === 0) return "ARRAY[]::text[]";
  return `ARRAY[${arr.map(item => escapeSQL(item)).join(', ')}]`;
}

const values = blogData.map(post => {
  return `(
    ${escapeSQL(post.id)},
    ${escapeSQL(post.slug)},
    ${escapeSQL(post.title)},
    ${escapeSQL(post.excerpt)},
    ${escapeSQL(post.content)},
    ${escapeSQL(post.author)},
    ${escapeSQL(post.category)},
    ${arrayToSQL(post.tags)},
    ${escapeSQL(post.image)},
    ${escapeSQL(post.publishedAt)},
    ${post.readTime},
    ${post.featured}
  )`;
}).join(',\n');

const sql = `
INSERT INTO blog_posts (
  id, slug, title, excerpt, content, author, category, tags, image, published_at, read_time, featured
) VALUES
${values}
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

console.log(sql);
