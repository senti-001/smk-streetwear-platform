import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart/cart-provider'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { PromoPopup } from '@/components/marketing/promo-popup'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SMK — Self Made King | Orange County Streetwear',
  description:
    'SMK (Self Made King) — premium Orange County streetwear. Drop-based collections built in the 949. Heavyweight, gothic, no compromise. IGBBMN.',
  generator: 'v0.app',
  openGraph: {
    title: 'SMK — Self Made King | Orange County Streetwear',
    description:
      'Premium Orange County streetwear. Heavyweight drops built in the 949. Self Made King. IGBBMN.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/smk-logo.png', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#d97316',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <PromoPopup />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
