'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Flame, Package } from 'lucide-react'
import { type Product, formatPrice } from '@/lib/products'

function InventoryBadge({ inventory }: { inventory: number }) {
  if (inventory <= 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-sm bg-secondary/50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        Sold Out
      </span>
    )
  }
  if (inventory <= 5) {
    return (
      <span className="inline-flex items-center gap-1 rounded-sm bg-destructive/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-destructive">
        <Flame className="size-3" />
        Only {inventory} Left
      </span>
    )
  }
  if (inventory <= 15) {
    return (
      <span className="inline-flex items-center gap-1 rounded-sm bg-primary/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
        <Package className="size-3" />
        {inventory} Remaining
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-sm bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {inventory} Left
    </span>
  )
}

interface ArchiveProductCardProps {
  product: Product
  discountPercent: number
  discountUrl: string
}

export function ArchiveProductCard({
  product,
  discountPercent,
  discountUrl,
}: ArchiveProductCardProps) {
  const soldOut = product.status === 'sold-out' || product.inventory <= 0

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
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${soldOut ? 'opacity-60 grayscale' : ''}`}
        />
        {/* Discount badge */}
        {!soldOut && discountPercent > 0 && (
          <span className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
            -{discountPercent}%
          </span>
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-sm bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-foreground">
            Sold Out
          </span>
        )}

        {!soldOut && (
          <a
            href={discountUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 bottom-3 translate-y-2 rounded-sm bg-background/95 py-2.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-y-0 group-hover:opacity-100"
          >
            Shop Archive ↗
          </a>
        )}
      </Link>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold leading-snug hover:text-primary"
          >
            {product.name}
          </Link>
          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
        </div>
        <InventoryBadge inventory={product.inventory} />
      </div>
    </div>
  )
}
