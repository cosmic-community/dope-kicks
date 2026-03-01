// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product Categories
export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Products
export type InventoryStatus = 'In Stock' | 'Out of Stock' | 'Limited Edition' | 'Pre-Order';
export type ProductCondition = 'New' | 'Like New' | 'Used' | 'Deadstock' | 'Vintage';

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    description?: string;
    price?: number;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    category?: ProductCategory;
    inventory_status?: InventoryStatus;
    condition?: ProductCondition;
    sku?: string;
  };
}

// Customer Reviews
export interface CustomerReview extends CosmicObject {
  type: 'customer-reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review_text?: string;
    product?: Product;
    verified_purchase?: boolean | string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guard helpers
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}