import Link from 'next/link';
import type { CustomerReview } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: CustomerReview;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous';
  const rating = review.metadata?.rating || 0;
  const reviewText = review.metadata?.review_text || '';
  const product = review.metadata?.product;
  const verifiedPurchase = review.metadata?.verified_purchase;

  // Handle verified_purchase which can be boolean or string
  const isVerified =
    verifiedPurchase === true ||
    verifiedPurchase === 'true' ||
    verifiedPurchase === 'Yes';

  return (
    <div className="bg-brand-card rounded-xl border border-brand-border p-6 hover:border-brand-border-light transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm">
            {reviewerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{reviewerName}</p>
            {isVerified && (
              <span className="inline-flex items-center gap-1 text-brand-success text-xs">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified Purchase
              </span>
            )}
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      {/* Review text */}
      {reviewText && (
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
          {reviewText}
        </p>
      )}

      {/* Product link */}
      {showProduct && product && (
        <div className="pt-4 border-t border-brand-border">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-3 group/product"
          >
            {product.metadata?.featured_image && (
              <img
                src={`${product.metadata.featured_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={product.metadata?.name || product.title}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover border border-brand-border"
              />
            )}
            <div>
              <p className="text-white text-sm font-medium group-hover/product:text-brand-accent transition-colors">
                {product.metadata?.name || product.title}
              </p>
              {product.metadata?.price !== undefined && product.metadata?.price !== null && (
                <p className="text-brand-muted text-xs">
                  ${Number(product.metadata.price).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}