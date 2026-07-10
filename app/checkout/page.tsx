'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, Loader2 } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { formatPrice } from '@/lib/products'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_123')

export default function CheckoutPage() {
  const { lines, subtotal } = useCart()
  const [loading, setLoading] = useState(false)
  
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 8
  const tax = Math.round(subtotal * 0.0775 * 100) / 100
  const total = subtotal + shipping + tax

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-4xl uppercase">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add something before you check out.
        </p>
        <Link
          href="/shop"
          className={cn(buttonVariants({ size: 'lg' }), 'mt-6 inline-flex h-11 px-8')}
        >
          Shop the drop
        </Link>
      </div>
    )
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: lines }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data.error)
        alert('An error occurred during checkout setup.')
        setLoading(false)
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 font-display text-4xl uppercase leading-none sm:text-5xl">
        Checkout
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Form */}
        <form
          onSubmit={handleCheckout}
          className="flex flex-col gap-8"
        >
          <section>
            <h2 className="mb-2 font-display text-xl uppercase">Payment</h2>
            <div className="rounded-sm border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Lock className="size-4 text-primary" /> Secure Stripe Checkout
              </p>
              <p className="mt-2 leading-relaxed">
                Card, Apple Pay, and Google Pay will be securely processed by Stripe. 
                You will be redirected to Stripe to enter your payment and shipping details.
              </p>
            </div>
          </section>

          <Button type="submit" size="lg" className="h-12 text-sm" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
          </Button>
        </form>

        {/* Summary */}
        <aside className="h-fit rounded-sm border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="mb-4 font-display text-xl uppercase">Order summary</h2>
          <ul className="flex flex-col gap-4">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={line.product.image || '/placeholder.svg'}
                    alt={line.product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium leading-tight">{line.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {line.color} &middot; {line.size}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  {formatPrice(line.product.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-foreground">
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated tax</span>
              <span className="text-foreground">{formatPrice(tax)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
