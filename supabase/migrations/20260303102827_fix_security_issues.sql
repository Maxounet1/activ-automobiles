/*
  # Fix Security Issues

  This migration addresses several security and performance issues:

  1. Remove Unused Indexes
     - Drop `idx_blog_posts_featured` (not used in queries)
     - Drop `idx_agencies_city` (not used in queries)
     - Drop `idx_agencies_rating` (not used in queries)

  2. Fix RLS Policies with Always-True Conditions
     - Replace overly permissive RLS policies with proper restrictions
     - Blog posts and agencies should only be modifiable by admin users
     - Contact messages can be inserted by anyone (this is intentional for contact forms)

  Security improvements:
  - Restricts INSERT/UPDATE/DELETE operations on blog_posts to admin users only
  - Restricts INSERT/UPDATE/DELETE operations on agencies to admin users only
  - Maintains public read access for blog_posts and agencies
  - Keeps contact_messages insertable by anyone (required for contact form)
*/

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. REMOVE UNUSED INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

DROP INDEX IF EXISTS idx_blog_posts_featured;
DROP INDEX IF EXISTS idx_agencies_city;
DROP INDEX IF EXISTS idx_agencies_rating;

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. FIX RLS POLICIES - BLOG_POSTS
-- ═══════════════════════════════════════════════════════════════════════════

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;

-- Create restrictive policies (admin-only access)
-- Note: For now, we'll require service role for modifications
-- In production, you should create an admin role check like:
-- auth.jwt() ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'

-- Only service role can insert blog posts
CREATE POLICY "Service role can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- Only service role can update blog posts
CREATE POLICY "Service role can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

-- Only service role can delete blog posts
CREATE POLICY "Service role can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (false);

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. FIX RLS POLICIES - AGENCIES
-- ═══════════════════════════════════════════════════════════════════════════

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert agencies" ON agencies;
DROP POLICY IF EXISTS "Authenticated users can update agencies" ON agencies;
DROP POLICY IF EXISTS "Authenticated users can delete agencies" ON agencies;

-- Create restrictive policies (admin-only access)
-- Only service role can insert agencies
CREATE POLICY "Service role can insert agencies"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- Only service role can update agencies
CREATE POLICY "Service role can update agencies"
  ON agencies FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

-- Only service role can delete agencies
CREATE POLICY "Service role can delete agencies"
  ON agencies FOR DELETE
  TO authenticated
  USING (false);

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. CONTACT_MESSAGES - KEEP CURRENT BEHAVIOR
-- ═══════════════════════════════════════════════════════════════════════════

-- The "Anyone can submit a contact message" policy is INTENTIONAL
-- Contact forms need to be accessible to anonymous users
-- This is a common and expected pattern for contact forms
-- No changes needed here