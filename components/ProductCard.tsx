import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = product.metadata?.name || product.title;
  const price = product.metadata?.price;
  const featuredImage = product.metadata?.featured_image;
  const inventoryStatus = product.metadata?.inventory_status;
  const condition = product.metadata?.condition;
  const category = product.metadata?.category;

  function getStatusBadge(status?: string) {
    switch (status) {
      case 'In Stock':
        return { bg: 'bg-brand-success/20', text: 'text-brand-success' };
      case 'Limited Edition':
        return { bg: 'bg-brand-warning/20', text: 'text-brand-warning' };
      case 'Pre-Order':
        return { bg: 'bg-brand-accent/20', text: 'text-brand-accent' };
      case 'Out of Stock':
        return { bg: 'bg-brand-danger/20', text: 'text-brand-danger' };
      default:
        return null;
    }
  }

  const badge = getStatusBadge(inventoryStatus);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-brand-card rounded-xl border border-brand-border hover:border-brand-accent/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-brand-accent/5"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-brand-darker">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-50">👟</span>
          </div>
        )}

        {/* Condition badge */}
        {condition && (
          <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
            {condition}
          </span>
        )}

        {/* Status badge */}
        {badge && inventoryStatus && (
          <span
            className={`absolute top-3 right-3 ${badge.bg} ${badge.text} text-xs font-bold px-2.5 py-1 rounded-md`}
          >
            {inventoryStatus}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {category && (
          <p className="text-brand-accent text-xs font-medium uppercase tracking-wider mb-1">
            {category.metadata?.name || category.title}
          </p>
        )}
        <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-brand-accent-light transition-colors line-clamp-2 mb-2">
          {name}
        </h3>
        {price !== undefined && price !== null && (
          <p className="text-lg font-bold text-white">
            ${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        )}
      </div>
    </Link>
  );
}