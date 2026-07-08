import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { COLLECTIONS } from '@/lib/products'

const HELP_LINKS = [
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping & Returns', href: '/faq' },
  { label: 'Size Guide', href: '/faq' },
]

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Account', href: '/account' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/smk-logo.png"
              alt="SMK — Self Made King"
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary-foreground/70">
              Self Made King. Premium streetwear built in Orange County for those
              who built it themselves.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground/60">
              Collections
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {COLLECTIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="text-secondary-foreground/80 transition-colors hover:text-primary"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground/60">
              Help
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-secondary-foreground/80 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground/60">
              Company
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-secondary-foreground/80 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground/60">
              Follow
            </h3>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-secondary-foreground/80 transition-colors hover:text-primary"
            >
              <Instagram className="size-5" /> @smk.streetwear
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-secondary-foreground/10 pt-6 text-xs text-secondary-foreground/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SMK Self Made King. Orange County.</p>
          <p className="uppercase tracking-[0.18em]">Made in the 949</p>
        </div>
      </div>
    </footer>
  )
}
