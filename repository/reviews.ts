import type { Review } from '@/lib/types';

/**
 * Reviews repository — returns empty data since the Supabase reviews table
 * doesn't exist. Replace with real data when Supabase tables are created.
 */

export async function getAllReviews(): Promise<Review[]> {
  return [];
}

export async function getReviewsByAgency(_agencyId: string): Promise<Review[]> {
  return [];
}

export async function getAverageRating(): Promise<number> {
  return 0;
}
