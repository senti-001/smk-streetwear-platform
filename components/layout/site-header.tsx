'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Shop All', href: '/shop' },
  { label: 'New', href: '/shop?sort=new' },
  { label: 'About', href: '/about' },
]

export function SiteHeader() {
  const { count, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="bg-secondary text-secondary-foreground">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em]">
          Free shipping on orders over $150 &middot; New drop live now
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <button
          type="button"
          className="flex items-center lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center"
          aria-label="SMK home"
        >
          <Image
            src="/smk-logo.png"
            alt="SMK — Self Made King"
            width={64}
            height={64}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            priority
          />
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/shop"
            className="hidden rounded-sm p-2 text-foreground transition-colors hover:text-primary sm:inline-flex"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Link>
          <Link
            href="/account"
            className="hidden rounded-sm p-2 text-foreground transition-colors hover:text-primary sm:inline-flex"
            aria-label="Account"
          >
            <User className="size-5" />
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-sm p-2 text-foreground transition-colors hover:text-primary"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag className="size-5" />
            <span
              className={cn(
                'absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground',
                count === 0 && 'hidden',
              )}
            >
              {count}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-background p-6">
            <div className="flex items-center justify-between">
              <Image
                src="/smk-logo.png"
                alt="SMK"
                width={48}
                height={48}
                className="h-10 w-10 object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-border py-3 font-display text-2xl uppercase text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="mt-auto flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <User className="size-5" /> Account
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
