import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/types';

function mapRow(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    author: row.author as string,
    category: row.category as string,
    tags: row.tags as string[],
    image: row.image as string,
    publishedAt: row.published_at as string,
    readTime: row.read_time as number,
    featured: row.featured as boolean,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapRow);
  } catch (err) {
    console.error('[blog] getAllPosts error:', err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
    if (error) throw error;
    return data ? mapRow(data) : null;
  } catch (err) {
    console.error('[blog] getPostBySlug error:', err);
    return null;
  }
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map(mapRow);
  } catch (err) {
    console.error('[blog] getFeaturedPosts error:', err);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapRow);
  } catch (err) {
    console.error('[blog] getPostsByCategory error:', err);
    return [];
  }
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .neq('id', post.id)
      .eq('category', post.category)
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    const related = (data ?? []).map(mapRow);
    if (related.length >= limit) return related;
    const ids = related.map(p => p.id);
    ids.push(post.id);
    const { data: tagMatches, error: tagError } = await supabase
      .from('blog_posts')
      .select('*')
      .not('id', 'in', `(${ids.join(',')})`)
      .overlaps('tags', post.tags)
      .order('published_at', { ascending: false })
      .limit(limit - related.length);
    if (tagError) throw tagError;
    return [...related, ...(tagMatches ?? []).map(mapRow)];
  } catch (err) {
    console.error('[blog] getRelatedPosts error:', err);
    return [];
  }
}
