/**
 * Shopify Admin API client for SMK Streetwear
 *
 * Uses the Shopify REST Admin API (2024-01).
 * Env vars required:
 *   SHOPIFY_STORE_DOMAIN  — e.g. hfvy1s-cu.myshopify.com
 *   SHOPIFY_ADMIN_TOKEN   — Admin API access token (Settings → Apps → Private apps)
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN ?? 'hfvy1s-cu.myshopify.com'
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN ?? ''
const API_VERSION = '2024-01'

const BASE_URL = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}`

function shopifyHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': SHOPIFY_TOKEN,
  }
}

// ── Types ──────────────────────────────────────────────────────────────────

export type ShopifyProduct = {
  id: number
  title: string
  handle: string
  status: 'active' | 'archived' | 'draft'
  created_at: string
  updated_at: string
  variants: ShopifyVariant[]
  tags: string
  product_type: string
  vendor: string
  images: { src: string }[]
}

export type ShopifyVariant = {
  id: number
  title: string
  price: string
  compare_at_price: string | null
  inventory_quantity: number
  sku: string
}

export type ShopifyDiscountCode = {
  id: number
  code: string
  created_at: string
}

export type InventorySummary = {
  productId: number
  handle: string
  title: string
  totalInventory: number
  hasDiscount: boolean
  discountPercent: number
  createdAt: string
  tags: string[]
  isSlowMover: boolean // >30 units AND >60 days old
  isLowStock: boolean  // ≤ 10 units total
}

// ── Fetch helpers ──────────────────────────────────────────────────────────

async function shopifyFetch<T>(
  path: string,
  options: RequestInit = {},
  revalidate = 3600,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...shopifyHeaders(), ...(options.headers ?? {}) },
    next: { revalidate },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Shopify API error ${res.status}: ${text}`)
  }

  return res.json() as Promise<T>
}

// ── Products ───────────────────────────────────────────────────────────────

export async function getShopifyProducts(status = 'active'): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ products: ShopifyProduct[] }>(
      `/products.json?status=${status}&limit=250`,
    )
    return data.products
  } catch (err) {
    console.error('[Shopify] Failed to fetch products:', err)
    return []
  }
}

export async function getShopifyProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<{ products: ShopifyProduct[] }>(
      `/products.json?handle=${handle}`,
    )
    return data.products[0] ?? null
  } catch {
    return null
  }
}

// ── Inventory ──────────────────────────────────────────────────────────────

export async function getInventorySummary(): Promise<InventorySummary[]> {
  const products = await getShopifyProducts()
  const now = Date.now()
  const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000

  return products.map((p) => {
    const totalInventory = p.variants.reduce((sum, v) => sum + (v.inventory_quantity ?? 0), 0)

    // Check if any variant has a compare_at_price set (i.e. currently discounted)
    const discountedVariant = p.variants.find(
      (v) => v.compare_at_price && parseFloat(v.compare_at_price) > parseFloat(v.price),
    )
    const hasDiscount = !!discountedVariant
    let discountPercent = 0
    if (discountedVariant && discountedVariant.compare_at_price) {
      const orig = parseFloat(discountedVariant.compare_at_price)
      const sale = parseFloat(discountedVariant.price)
      discountPercent = Math.round(((orig - sale) / orig) * 100)
    }

    const ageMs = now - new Date(p.created_at).getTime()
    const isSlowMover = totalInventory > 30 && ageMs > SIXTY_DAYS_MS
    const isLowStock = totalInventory > 0 && totalInventory <= 10

    return {
      productId: p.id,
      handle: p.handle,
      title: p.title,
      totalInventory,
      hasDiscount,
      discountPercent,
      createdAt: p.created_at,
      tags: p.tags ? p.tags.split(',').map((t) => t.trim()) : [],
      isSlowMover,
      isLowStock,
    }
  })
}

// ── Discount Codes ─────────────────────────────────────────────────────────

/**
 * Creates a price rule + discount code on Shopify.
 * Returns the shareable URL: https://yourstore.com/discount/<CODE>
 */
export async function createArchiveDiscountCode(
  discountPercent: number,
  code = 'ARCHIVE',
): Promise<string | null> {
  try {
    // 1. Create price rule
    const ruleData = await shopifyFetch<{ price_rule: { id: number } }>(
      '/price_rules.json',
      {
        method: 'POST',
        body: JSON.stringify({
          price_rule: {
            title: `${code} — ${discountPercent}% Off Archive`,
            target_type: 'line_item',
            target_selection: 'all',
            allocation_method: 'across',
            value_type: 'percentage',
            value: `-${discountPercent}`,
            customer_selection: 'all',
            starts_at: new Date().toISOString(),
          },
        }),
      },
      0, // no cache for mutations
    )

    const priceRuleId = ruleData.price_rule.id

    // 2. Create discount code under the rule
    await shopifyFetch<{ discount_code: ShopifyDiscountCode }>(
      `/price_rules/${priceRuleId}/discount_codes.json`,
      {
        method: 'POST',
        body: JSON.stringify({ discount_code: { code } }),
      },
      0,
    )

    const storeDomain = SHOPIFY_DOMAIN.replace('.myshopify.com', '')
    return `https://${storeDomain}.myshopify.com/discount/${code}`
  } catch (err) {
    console.error('[Shopify] Failed to create discount code:', err)
    return null
  }
}

// ── Archive helpers ────────────────────────────────────────────────────────

/** Returns all products that should be in the Archive Drop */
export async function getArchiveProducts(): Promise<InventorySummary[]> {
  const summary = await getInventorySummary()
  return summary.filter((p) => p.isSlowMover || p.hasDiscount)
}

/** Total inventory count for archive products */
export async function getArchiveTotalInventory(): Promise<number> {
  const archive = await getArchiveProducts()
  return archive.reduce((sum, p) => sum + p.totalInventory, 0)
}
