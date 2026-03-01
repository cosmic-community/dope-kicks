import type { Metadata } from 'next';
import { getProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Products | Dope Kicks',
  description:
    'Browse our full collection of designer shoes, limited editions, and rare collectibles.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-darker py-20 border-b border-brand-border">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex justify-center mb-6 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Products</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All <span className="gradient-text">Products</span>
          </h1>
          <p className="text-brand-muted-light text-lg max-w-2xl mx-auto">
            Discover our full collection of designer kicks and exclusive collectibles.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">
              No products available yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <p className="text-brand-muted mb-8">
              Showing{' '}
              <span className="text-white font-medium">{products.length}</span>{' '}
              product{products.length === 1 ? '' : 's'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}