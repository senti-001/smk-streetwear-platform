'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/commerce/product-card'
import {
  COLLECTIONS,
  type CollectionSlug,
  type Product,
} from '@/lib/products'
import { cn } from '@/lib/utils'

const CATEGORIES: Product['category'][] = [
  'Tops',
  'Fleece',
  'Bottoms',
  'Outerwear',
  'Headwear',
]

type SortKey = 'featured' | 'new' | 'price-asc' | 'price-desc'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export function ShopGrid({
  products,
  initialSort = 'featured',
}: {
  products: Product[]
  initialSort?: SortKey
}) {
  const [sort, setSort] = useState<SortKey>(initialSort)
  const [collections, setCollections] = useState<CollectionSlug[]>([])
  const [categories, setCategories] = useState<Product['category'][]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (collections.length && !collections.includes(p.collection)) return false
      if (categories.length && !categories.includes(p.category)) return false
      if (inStockOnly && p.status === 'sold-out') return false
      return true
    })

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'new':
          return (b.status === 'new' ? 1 : 0) - (a.status === 'new' ? 1 : 0)
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })
    return list
  }, [products, collections, categories, inStockOnly, sort])

  function toggle<T>(value: T, list: T[], setter: (v: T[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const activeCount =
    collections.length + categories.length + (inStockOnly ? 1 : 0)

  const FilterPanel = (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Collection
        </legend>
        <div className="flex flex-col gap-2">
          {COLLECTIONS.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={collections.includes(c.slug)}
                onChange={() => toggle(c.slug, collections, setCollections)}
                className="size-4 accent-primary"
              />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Category
        </legend>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggle(cat, categories, setCategories)}
                className="size-4 accent-primary"
              />
              {cat}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="size-4 accent-primary"
        />
        In stock only
      </label>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => {
            setCollections([])
            setCategories([])
            setInStockOnly(false)
          }}
          className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Desktop filters */}
      <aside className="hidden w-52 shrink-0 lg:block">
        <div className="sticky top-28">{FilterPanel}</div>
      </aside>

      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-border pb-4">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters{activeCount ? ` (${activeCount})` : ''}
          </button>
          <p className="hidden text-sm text-muted-foreground lg:block">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-sm border border-border bg-background px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No products match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-xl bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase">Filters</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X className="size-6" />
              </button>
            </div>
            {FilterPanel}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className={cn(
                'mt-6 w-full rounded-sm bg-primary py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground',
              )}
            >
              Show {filtered.length} items
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
