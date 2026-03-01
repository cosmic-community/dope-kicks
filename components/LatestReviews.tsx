import Link from 'next/link';
import type { CustomerReview } from '@/types';
import ReviewCard from '@/components/ReviewCard';
import StarRating from '@/components/StarRating';

interface LatestReviewsProps {
  reviews: CustomerReview[];
}

export default function LatestReviews({ reviews }: LatestReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Show up to 3 latest reviews
  const latest = reviews.slice(0, 3);

  const averageRating =
    reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / reviews.length;

  return (
    <section className="bg-brand-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="text-brand-accent text-sm font-semibold uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              What Customers Say
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={averageRating} />
              <span className="text-brand-muted-light text-sm">
                {averageRating.toFixed(1)} average from {reviews.length} review
                {reviews.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>
          <Link
            href="/reviews"
            className="mt-4 sm:mt-0 text-brand-accent hover:text-brand-accent-light transition-colors font-medium text-sm flex items-center gap-1"
          >
            All Reviews
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct={true} />
          ))}
        </div>
      </div>
    </section>
  );
}