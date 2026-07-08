'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { PRODUCTS, formatPrice } from '@/lib/products'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const FREE_SHIPPING_THRESHOLD = 150

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    subtotal,
    updateQuantity,
    removeItem,
    addItem,
  } = useCart()

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  const cartProductIds = new Set(lines.map((l) => l.product.id))
  const upsells = PRODUCTS.filter(
    (p) => !cartProductIds.has(p.id) && p.category === 'Headwear',
  ).slice(0, 2)

  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          'absolute inset-0 bg-foreground/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={closeCart}
      />

      <aside
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl uppercase">
            Your Bag ({lines.reduce((s, l) => s + l.quantity, 0)})
          </h2>
          <button type="button" onClick={closeCart} aria-label="Close cart">
            <X className="size-6" />
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="border-b border-border px-5 py-4">
          {remaining > 0 ? (
            <p className="mb-2 text-sm">
              You&apos;re{' '}
              <span className="font-semibold text-primary">
                {formatPrice(remaining)}
              </span>{' '}
              away from free shipping.
            </p>
          ) : (
            <p className="mb-2 text-sm font-semibold text-primary">
              You&apos;ve unlocked free shipping.
            </p>
          )}
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="font-display text-2xl uppercase">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">
              Add something from the latest drop.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className={cn(buttonVariants({ size: 'lg' }), 'mt-2 h-11 px-6')}
            >
              Shop the drop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-border">
                {lines.map((line) => (
                  <li key={line.key} className="flex gap-4 py-4">
                    <Link
                      href={`/products/${line.product.slug}`}
                      onClick={closeCart}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-muted"
                    >
                      <Image
                        src={line.product.image || '/placeholder.svg'}
                        alt={line.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link
                          href={`/products/${line.product.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold leading-snug hover:text-primary"
                        >
                          {line.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(line.key)}
                          aria-label="Remove item"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {line.color} &middot; {line.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-sm border border-border">
                          <button
                            type="button"
                            className="flex size-7 items-center justify-center hover:text-primary"
                            onClick={() =>
                              updateQuantity(line.key, line.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center text-sm">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex size-7 items-center justify-center hover:text-primary"
                            onClick={() =>
                              updateQuantity(line.key, line.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(line.product.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Upsells */}
              {upsells.length > 0 && (
                <div className="border-t border-border py-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Complete the fit
                  </p>
                  <div className="flex flex-col gap-3">
                    {upsells.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                          <Image
                            src={p.image || '/placeholder.svg'}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-tight">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(p.price)}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addItem(p, p.sizes[0], p.colors[0])}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="mb-1 flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className={cn(buttonVariants({ size: 'lg' }), 'h-12 w-full text-sm')}
              >
                Checkout &middot; {formatPrice(subtotal)}
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
