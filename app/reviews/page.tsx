import type { Metadata } from 'next';
import Link from 'next/link';
import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';
import StarRating from '@/components/StarRating';

export const metadata: Metadata = {
  title: 'Customer Reviews | Dope Kicks',
  description:
    'Read authentic reviews from our customers about designer shoes and collectibles.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / reviews.length
      : 0;

  return (
    <section className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-darker py-20 border-b border-brand-border">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-brand-warning rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex justify-center mb-6 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Reviews</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Customer <span className="gradient-text">Reviews</span>
          </h1>
          <p className="text-brand-muted-light text-lg max-w-2xl mx-auto mb-6">
            Hear what our customers have to say about their Dope Kicks experience.
          </p>

          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-4">
              <StarRating rating={averageRating} size="lg" />
              <span className="text-white text-xl font-semibold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-brand-muted">
                ({reviews.length} review{reviews.length === 1 ? '' : 's'})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct={true} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}