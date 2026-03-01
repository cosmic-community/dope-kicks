import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Categories | Dope Kicks',
  description: 'Browse our product categories — designer shoes, collectibles, and more.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-darker py-20 border-b border-brand-border">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-brand-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex justify-center mb-6 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Categories</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop by <span className="gradient-text">Category</span>
          </h1>
          <p className="text-brand-muted-light text-lg max-w-2xl mx-auto">
            Find exactly what you&apos;re looking for by browsing our curated categories.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">
              No categories available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}