import Link from 'next/link';
import type { ProductCategory } from '@/types';

interface CategoryCardProps {
  category: ProductCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;
  const image = category.metadata?.category_image;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block rounded-2xl overflow-hidden border border-brand-border hover:border-brand-accent/50 transition-all duration-300 aspect-[4/3]"
    >
      {/* Background Image */}
      {image ? (
        <img
          src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={name}
          width={400}
          height={300}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-brand-card" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-white text-xl font-bold group-hover:text-brand-accent-light transition-colors mb-1">
          {name}
        </h3>
        {description && (
          <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
        )}
        <span className="mt-3 inline-flex items-center text-brand-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Browse Collection
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}