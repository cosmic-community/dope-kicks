// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { title: 'Category Not Found | Dope Kicks' };
  }
  return {
    title: `${category.metadata?.name || category.title} | Dope Kicks`,
    description: category.metadata?.description || 'Browse products in this category.',
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const categoryName = category.metadata?.name || category.title;
  const categoryDescription = category.metadata?.description || '';
  const categoryImage = category.metadata?.category_image;

  return (
    <section className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-darker py-20 border-b border-brand-border">
        {categoryImage && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={`${categoryImage.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress&blur=50`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/80 to-brand-darker/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex justify-center mb-6 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-brand-accent transition-colors">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{categoryName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {categoryName}
          </h1>
          {categoryDescription && (
            <p className="text-brand-muted-light text-lg max-w-2xl mx-auto">
              {categoryDescription}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">
              No products in this category yet. Check back soon!
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 px-6 py-3 bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold rounded-lg transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-brand-muted mb-8">
              Showing{' '}
              <span className="text-white font-medium">{products.length}</span>{' '}
              product{products.length === 1 ? '' : 's'} in{' '}
              <span className="text-brand-accent">{categoryName}</span>
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