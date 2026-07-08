import type { Metadata } from 'next'
import { ShopGrid } from '@/components/commerce/shop-grid'
import { PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop All | SMK — Self Made King',
  description: 'Shop the full SMK collection of premium Orange County streetwear.',
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const { sort } = await searchParams
  const initialSort =
    sort === 'new' ? 'new' : sort === 'price-asc' ? 'price-asc' : 'featured'

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Everything
        </p>
        <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">
          Shop All
        </h1>
      </header>
      <ShopGrid products={PRODUCTS} initialSort={initialSort} />
    </div>
  )
}
