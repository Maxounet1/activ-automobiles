/*
  # Clean up duplicate RLS policies

  Remove old admin-based policies that are no longer needed.
  The new policies block all authenticated user modifications,
  requiring use of the service role for admin operations.

  This is more secure as it prevents any authenticated user from
  modifying blog posts or agencies through the regular API.
*/

-- Remove old admin policies for blog_posts
DROP POLICY IF EXISTS "Only admins can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can delete blog posts" ON blog_posts;

-- Remove old admin policies for agencies
DROP POLICY IF EXISTS "Only admins can insert agencies" ON agencies;
DROP POLICY IF EXISTS "Only admins can update agencies" ON agencies;
DROP POLICY IF EXISTS "Only admins can delete agencies" ON agencies;