# Dope Kicks - Designer Shoes & Collectibles

![Dope Kicks Store](https://imgix.cosmicjs.com/0edceca0-4fb3-11f0-878d-e9ed4543e8c1-pexels-melvin-buezo-2529148.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A premium online storefront for designer shoes and rare collectibles, built with Next.js 16 and Cosmic CMS. Features a bold streetwear-inspired design with dynamic product catalog, category browsing, customer reviews, and full responsive support.

## Features

- 🏠 **Stunning Homepage** — Hero section, featured products, categories, and latest reviews
- 👟 **Product Catalog** — Grid-based product browsing with pricing, condition badges, and inventory status
- 📄 **Product Detail Pages** — Full gallery, specifications, and customer reviews per product
- 🏷️ **Category Pages** — Browse products filtered by category
- ⭐ **Customer Reviews** — Star ratings, verified purchase badges, and review listings
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- ⚡ **Server Components** — Lightning-fast rendering with Next.js 16 App Router
- 🎨 **Modern Dark Theme** — Streetwear-inspired design with electric blue accents

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a4afbfbc78fb157ac1dd60&clone_repository=69a4b136bc78fb157ac1dd8b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews. Additional details: Sell designer shoes and collectors items"

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Dope Kicks'. The content is managed in Cosmic CMS with the following object types: product-categories, products, customer-reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. Additional context: Sell designer shoes and collectors items"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [@cosmicjs/sdk](https://www.npmjs.com/package/@cosmicjs/sdk) — Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dope-kicks
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables in your hosting platform or `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug
```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'air-jordan-1' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'customer-reviews', 'metadata.product': productId })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| Products | `products` | Designer shoes and collectibles with images, pricing, SKU, condition, and inventory status |
| Product Categories | `product-categories` | Organized product categories with descriptions and images |
| Customer Reviews | `customer-reviews` | Customer ratings and reviews with verified purchase indicators |

### Content Model Relationships
- **Products** → linked to **Product Categories** via `category` metafield
- **Customer Reviews** → linked to **Products** via `product` metafield

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify
1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables in the Netlify dashboard
5. Deploy

<!-- README_END -->