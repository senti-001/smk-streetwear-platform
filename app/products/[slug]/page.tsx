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
  return {
    title: `${product.name} | SMK — Self Made King`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability:
        product.status === 'sold-out'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
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
