import Link from 'next/link';
import type { ProductCategory } from '@/types';
import CategoryCard from '@/components/CategoryCard';

interface CategoryShowcaseProps {
  categories: ProductCategory[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-brand-darker py-20 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="text-brand-accent text-sm font-semibold uppercase tracking-wider">
              Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="mt-4 sm:mt-0 text-brand-accent hover:text-brand-accent-light transition-colors font-medium text-sm flex items-center gap-1"
          >
            All Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}