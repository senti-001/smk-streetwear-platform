import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductDetail } from '@/components/commerce/product-detail'
import { ProductCard } from '@/components/commerce/product-card'
import {
  PRODUCTS,
  getCollection,
  getProduct,
  relatedProducts,
} from '@/lib/products'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Product | SMK' }

  // Rich SEO title: "SMK [Name] — [Category] | Self Made King OC Streetwear"
  const seoTitle = `SMK ${product.name} — ${product.category} | Self Made King Orange County Streetwear`
  const seoDesc = `${product.description} ${product.details.join(' ')} Free shipping on orders over $75.`
  const productUrl = `https://smk-streetwear-platform.vercel.app/products/${product.slug}`
  const imageUrl = `https://smk-streetwear-platform.vercel.app${product.image}`

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: [
      'SMK streetwear',
      'Self Made King',
      'Orange County streetwear',
      '949',
      product.name,
      product.category.toLowerCase(),
      'heavyweight streetwear',
      'premium streetwear',
      'oversized hoodie',
      'OC streetwear',
    ],
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: productUrl,
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 1500, alt: product.name }],
    },
    alternates: {
      canonical: productUrl,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const collection = getCollection(product.collection)
  const related = relatedProducts(product)

  const baseUrl = 'https://smk-streetwear-platform.vercel.app'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${baseUrl}${product.image}`,
    url: `${baseUrl}/products/${product.slug}`,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'SMK — Self Made King',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability:
        product.status === 'sold-out'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'SMK Streetwear',
      },
      ...(product.compareAtPrice
        ? { priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
        : {}),
    },
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>{' '}
        /{' '}
        {collection && (
          <>
            <Link
              href={`/collections/${collection.slug}`}
              className="hover:text-primary"
            >
              {collection.name}
            </Link>{' '}
            /{' '}
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {/* Related */}
      <section className="mt-20">
        <h2 className="mb-8 font-display text-3xl uppercase leading-none sm:text-4xl">
          You may also like
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
