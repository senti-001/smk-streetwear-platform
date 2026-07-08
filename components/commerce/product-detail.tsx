'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Minus, Plus, Ruler, Share2, Truck, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { type Product, formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SIZE_GUIDE = [
  { size: 'S', chest: '38-40', length: '28' },
  { size: 'M', chest: '40-42', length: '29' },
  { size: 'L', chest: '42-44', length: '30' },
  { size: 'XL', chest: '44-46', length: '31' },
  { size: 'XXL', chest: '46-48', length: '32' },
]

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  )
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [error, setError] = useState(false)

  const soldOut = product.status === 'sold-out'
  const lowStock = product.inventory <= 15 && !soldOut

  function handleAdd() {
    if (!size) {
      setError(true)
      return
    }
    addItem(product, size, color, quantity)
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          {product.images.length > 1 && (
            <div className="flex gap-3 sm:flex-col">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'relative h-20 w-16 shrink-0 overflow-hidden rounded-sm border bg-muted',
                    activeImage === i ? 'border-primary' : 'border-border',
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
          <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-sm bg-muted">
            <Image
              src={product.images[activeImage] || product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {product.status === 'limited' ? 'Limited Drop' : product.category}
          </p>
          <h1 className="font-display text-4xl uppercase leading-none sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Color */}
          <div className="mt-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
              Color: <span className="text-muted-foreground">{color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    'rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors',
                    color === c
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border hover:border-foreground',
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Size
              </p>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary"
              >
                <Ruler className="size-3.5" /> Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s)
                    setError(false)
                  }}
                  className={cn(
                    'min-w-11 rounded-sm border px-3 py-2 text-sm font-medium transition-colors',
                    size === s
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-foreground',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && (
              <p className="mt-2 text-xs font-medium text-destructive">
                Please select a size.
              </p>
            )}
          </div>

          {/* Quantity + add */}
          <div className="mt-7 flex items-stretch gap-3">
            <div className="flex items-center rounded-sm border border-border">
              <button
                type="button"
                className="flex size-11 items-center justify-center hover:text-primary"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                className="flex size-11 items-center justify-center hover:text-primary"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="h-11 flex-1 text-sm"
              disabled={soldOut}
              onClick={handleAdd}
            >
              {soldOut ? 'Sold Out' : `Add to bag \u00b7 ${formatPrice(product.price * quantity)}`}
            </Button>
            <button
              type="button"
              onClick={() => setWishlisted((w) => !w)}
              aria-label="Add to wishlist"
              className={cn(
                'flex size-11 items-center justify-center rounded-sm border border-border transition-colors hover:border-foreground',
                wishlisted && 'border-primary text-primary',
              )}
            >
              <Heart className={cn('size-5', wishlisted && 'fill-current')} />
            </button>
          </div>

          {lowStock && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Only {product.inventory} left &mdash; your size may sell out
            </p>
          )}

          {/* Shipping */}
          <div className="mt-6 flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-3 text-sm">
            <Truck className="size-4 text-primary" />
            <span className="text-muted-foreground">
              Free shipping over $150 &middot; Ships in 1-2 business days
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href })
              }
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            <Share2 className="size-3.5" /> Share
          </button>

          {/* Details */}
          <div className="mt-8 border-t border-border pt-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]">
              Details
            </h2>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-primary">&mdash;</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Size guide modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setSizeGuideOpen(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-md rounded-sm bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase">Size Guide</h2>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                aria-label="Close size guide"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Measurements in inches. Fits true to size with a relaxed cut.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="pb-2">Size</th>
                  <th className="pb-2">Chest</th>
                  <th className="pb-2">Length</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.size} className="border-b border-border/60">
                    <td className="py-2 font-medium">{row.size}</td>
                    <td className="py-2">{row.chest}</td>
                    <td className="py-2">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
