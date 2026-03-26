import type { BlogPost } from '@/lib/types';
import blogData from '@/lib/data/blog.json';

// ─── Local JSON data source ────────────────────────────────────────────────────
// Reads the 40 articles from lib/data/blog.json (originally from Bolt import).
// Sorted by publishedAt descending by default.

const posts: BlogPost[] = (blogData as BlogPost[]).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export async function getAllPosts(): Promise<BlogPost[]> {
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  return posts.filter((p) => p.featured).slice(0, limit);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return posts.filter((p) => p.category === category);
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  // 1. Same category
  const sameCategory = posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, limit);
  if (sameCategory.length >= limit) return sameCategory;

  // 2. Fill with tag matches
  const usedIds = new Set([post.id, ...sameCategory.map((p) => p.id)]);
  const tagMatches = posts
    .filter((p) => !usedIds.has(p.id) && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit - sameCategory.length);

  return [...sameCategory, ...tagMatches];
}
