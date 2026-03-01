import Link from 'next/link';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  // Show up to 8 featured products
  const featured = products.slice(0, 8);

  return (
    <section className="bg-brand-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="text-brand-accent text-sm font-semibold uppercase tracking-wider">
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Latest Drops
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-4 sm:mt-0 text-brand-accent hover:text-brand-accent-light transition-colors font-medium text-sm flex items-center gap-1"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}