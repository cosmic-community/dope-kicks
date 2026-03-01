// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getReviewsByProduct, resolveSelectValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found | Dope Kicks' };
  }
  return {
    title: `${product.metadata?.name || product.title} | Dope Kicks`,
    description: product.metadata?.description || 'Shop this product at Dope Kicks.',
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);

  const name = product.metadata?.name || product.title;
  const description = product.metadata?.description || '';
  const price = product.metadata?.price;
  const featuredImage = product.metadata?.featured_image;
  const gallery = product.metadata?.gallery;
  const category = product.metadata?.category;
  // Changed: Use resolveSelectValue to safely extract string from select-dropdown metafields
  const inventoryStatus = resolveSelectValue(product.metadata?.inventory_status);
  const condition = resolveSelectValue(product.metadata?.condition);
  const sku = product.metadata?.sku;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / reviews.length
      : 0;

  function getStatusColor(status?: string): string {
    switch (status) {
      case 'In Stock':
        return 'bg-brand-success/20 text-brand-success border-brand-success/30';
      case 'Limited Edition':
        return 'bg-brand-warning/20 text-brand-warning border-brand-warning/30';
      case 'Pre-Order':
        return 'bg-brand-accent/20 text-brand-accent border-brand-accent/30';
      case 'Out of Stock':
        return 'bg-brand-danger/20 text-brand-danger border-brand-danger/30';
      default:
        return 'bg-brand-muted/20 text-brand-muted border-brand-muted/30';
    }
  }

  return (
    <section className="min-h-screen bg-brand-dark">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex text-sm text-brand-muted">
          <Link href="/" className="hover:text-brand-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-brand-accent transition-colors">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white truncate max-w-[200px]">{name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            {featuredImage ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-card border border-brand-border">
                <img
                  src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                {condition && (
                  <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {condition}
                  </span>
                )}
              </div>
            ) : (
              <div className="aspect-square rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center">
                <span className="text-6xl">👟</span>
              </div>
            )}

            {/* Gallery thumbnails */}
            {gallery && gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden bg-brand-card border border-brand-border hover:border-brand-accent transition-colors"
                  >
                    <img
                      src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                      alt={`${name} gallery ${idx + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="text-brand-accent text-sm font-medium uppercase tracking-wider hover:text-brand-accent-light transition-colors mb-2"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {name}
            </h1>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={averageRating} />
                <span className="text-brand-muted text-sm">
                  ({reviews.length} review{reviews.length === 1 ? '' : 's'})
                </span>
              </div>
            )}

            {/* Price */}
            {price !== undefined && price !== null && (
              <p className="text-4xl font-bold text-white mb-6">
                ${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            )}

            {/* Status badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {inventoryStatus && (
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(inventoryStatus)}`}
                >
                  {inventoryStatus}
                </span>
              )}
              {condition && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-brand-accent/10 text-brand-accent-light border-brand-accent/30">
                  {condition}
                </span>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-brand-muted-light uppercase tracking-wide mb-3">
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </div>
            )}

            {/* Details */}
            <div className="bg-brand-card rounded-xl border border-brand-border p-6 mb-8">
              <h3 className="text-sm font-semibold text-brand-muted-light uppercase tracking-wide mb-4">
                Details
              </h3>
              <dl className="space-y-3">
                {sku && (
                  <div className="flex justify-between">
                    <dt className="text-brand-muted">SKU</dt>
                    <dd className="text-white font-mono text-sm">{sku}</dd>
                  </div>
                )}
                {condition && (
                  <div className="flex justify-between">
                    <dt className="text-brand-muted">Condition</dt>
                    <dd className="text-white">{condition}</dd>
                  </div>
                )}
                {inventoryStatus && (
                  <div className="flex justify-between">
                    <dt className="text-brand-muted">Availability</dt>
                    <dd className="text-white">{inventoryStatus}</dd>
                  </div>
                )}
                {category && (
                  <div className="flex justify-between">
                    <dt className="text-brand-muted">Category</dt>
                    <dd className="text-white">
                      {category.metadata?.name || category.title}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-brand-border pt-12">
          <h2 className="text-2xl font-bold text-white mb-8">
            Customer Reviews
            {reviews.length > 0 && (
              <span className="text-brand-muted text-lg font-normal ml-2">
                ({reviews.length})
              </span>
            )}
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-brand-card rounded-xl border border-brand-border p-12 text-center">
              <p className="text-brand-muted text-lg">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}