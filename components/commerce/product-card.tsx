'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/cart-provider'
import { type Product, formatPrice } from '@/lib/products'
import { cn } from '@/lib/utils'

const STATUS_LABEL: Record<Product['status'], string | null> = {
  new: 'New',
  core: null,
  limited: 'Limited',
  'sold-out': 'Sold Out',
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const badge = STATUS_LABEL[product.status]
  const soldOut = product.status === 'sold-out'

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted"
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span
            className={cn(
              'absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em]',
              product.status === 'limited'
                ? 'bg-primary text-primary-foreground'
                : product.status === 'sold-out'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-foreground text-background',
            )}
          >
            {badge}
          </span>
        )}

        {!soldOut && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              addItem(product, product.sizes[0], product.colors[0])
            }}
            className="absolute inset-x-3 bottom-3 translate-y-2 rounded-sm bg-background/95 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-y-0 group-hover:opacity-100"
          >
            Quick add
          </button>
        )}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold leading-snug hover:text-primary"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {product.category}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
