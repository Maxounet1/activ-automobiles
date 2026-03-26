import type { Review } from '@/lib/types';
import reviewsData from '@/lib/data/reviews.json';

const reviews: Review[] = reviewsData as Review[];

export async function getAllReviews(): Promise<Review[]> {
  return reviews;
}

export async function getReviewsByAgency(agencyId: string): Promise<Review[]> {
  return reviews.filter((r) => r.agencyId === agencyId);
}

export async function getAverageRating(): Promise<number> {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
