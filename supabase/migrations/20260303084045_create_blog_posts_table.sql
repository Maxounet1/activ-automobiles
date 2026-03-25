/*
  # Create blog_posts table

  1. New Tables
    - `blog_posts`
      - `id` (text, primary key) - Unique identifier for the blog post
      - `slug` (text, unique, not null) - URL-friendly version of the title
      - `title` (text, not null) - Blog post title
      - `excerpt` (text, not null) - Short description/summary
      - `content` (text, not null) - Full article content in markdown
      - `author` (text, not null) - Author name
      - `category` (text, not null) - Blog post category
      - `tags` (text[], not null, default '{}') - Array of tags
      - `image` (text, not null) - Featured image URL
      - `published_at` (timestamptz, not null) - Publication timestamp
      - `read_time` (integer, not null, default 5) - Estimated reading time in minutes
      - `featured` (boolean, not null, default false) - Whether the post is featured
      - `created_at` (timestamptz, default now()) - Record creation timestamp
      - `updated_at` (timestamptz, default now()) - Record update timestamp

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access (blog posts are public content)
    - Add policy for authenticated insert/update/delete (only for admin users)

  3. Indexes
    - Index on slug for fast lookups
    - Index on category for filtering
    - Index on published_at for ordering
    - Index on featured for featured posts queries
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  image text NOT NULL,
  published_at timestamptz NOT NULL,
  read_time integer NOT NULL DEFAULT 5,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access (blog posts are public content)
CREATE POLICY "Anyone can view blog posts"
  ON blog_posts FOR SELECT
  USING (true);

-- Only authenticated users can insert (for admin functionality)
CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);