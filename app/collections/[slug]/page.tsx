import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ShopGrid } from '@/components/commerce/shop-grid'
import {
  COLLECTIONS,
  type CollectionSlug,
  getCollection,
  productsByCollection,
} from '@/lib/products'

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollection(slug as CollectionSlug)
  if (!collection) return { title: 'Collection | SMK' }
  return {
    title: `${collection.name} | SMK — Self Made King`,
    description: collection.description,
  }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = getCollection(slug as CollectionSlug)
  if (!collection) notFound()

  const products = productsByCollection(collection.slug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <nav className="mb-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link href="/collections" className="hover:text-primary">
          Collections
        </Link>{' '}
        / <span className="text-foreground">{collection.name}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {collection.tagline}
        </p>
        <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">
          {collection.name}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {collection.description}
        </p>
      </header>

      {products.length > 0 ? (
        <ShopGrid products={products} />
      ) : (
        <p className="py-20 text-center text-muted-foreground">
          This collection drops soon. Sign up to be notified.
        </p>
      )}
    </div>
  )
}
