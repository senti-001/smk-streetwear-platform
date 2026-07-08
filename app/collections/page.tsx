import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { COLLECTIONS, PRODUCTS, productsByCollection } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Collections | SMK — Self Made King',
  description: 'Explore SMK collections: Self Made King, Federal Reserve, Smoke Series, 949 Essentials, and more.',
}

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Shop by line
        </p>
        <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">
          Collections
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {COLLECTIONS.map((collection) => {
          const items = productsByCollection(collection.slug)
          const cover = items[0]?.image ?? PRODUCTS[0].image
          return (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-sm bg-muted p-6"
            >
              <Image
                src={cover || '/placeholder.svg'}
                alt={collection.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/20 to-transparent" />
              <div className="relative">
                <h2 className="font-display text-3xl uppercase leading-none text-background sm:text-4xl">
                  {collection.name}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-background/80">
                  {collection.tagline} &middot; {items.length}{' '}
                  {items.length === 1 ? 'piece' : 'pieces'}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
