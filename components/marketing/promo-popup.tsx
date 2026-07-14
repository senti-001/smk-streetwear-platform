'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'
import { getProduct } from '@/lib/products'

export function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasDismissed, setHasDismissed] = useState(true) // default true to prevent hydration mismatch flash

  const product = getProduct('igbbmn-tee')

  useEffect(() => {
    // Check if user has already dismissed this session
    const dismissed = sessionStorage.getItem('promo-dismissed') === 'true'
    setHasDismissed(dismissed)

    if (!dismissed) {
      // Trigger slide in after 2.5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('promo-dismissed', 'true')
    setHasDismissed(true)
  }

  if (!product || hasDismissed) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-full max-w-[360px] p-4 transition-all duration-700 ease-out sm:bottom-6 sm:right-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 z-10 flex size-6 items-center justify-center rounded-full bg-background/50 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          aria-label="Close promotion"
        >
          <X className="size-4" />
        </button>

        <Link href={`/products/${product.slug}`} onClick={handleDismiss} className="group block">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/30">
            <Image
              src={product.images[1] || product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Featured Drop
              </p>
              <h3 className="font-display text-2xl uppercase leading-none text-foreground">
                {product.name}
              </h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  ${product.price}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  Shop Now <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
