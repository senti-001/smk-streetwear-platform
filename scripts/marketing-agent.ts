/**
 * SMK Marketing Agent
 *
 * Runs daily via GitHub Actions. Orchestrates:
 *   1. Shopify inventory sync → lib/shopify-inventory-cache.json
 *   2. Slow mover / low-stock detection
 *   3. AI copy generation (Instagram, email, archive copy) via Gemini
 *   4. marketing-config.json update
 *
 * Outputs a summary to stdout for the PR body.
 *
 * Usage:
 *   npx ts-node --project tsconfig.scripts.json scripts/marketing-agent.ts
 *
 * Env vars needed (GitHub repo secrets):
 *   SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN, GEMINI_API_KEY
 */

import * as fs from 'fs'
import * as path from 'path'

// ── Types ──────────────────────────────────────────────────────────────────

interface ShopifyVariant {
  id: number
  price: string
  compare_at_price: string | null
  inventory_quantity: number
}

interface ShopifyProduct {
  id: number
  title: string
  handle: string
  status: string
  created_at: string
  variants: ShopifyVariant[]
  tags: string
  product_type: string
}

interface InventoryEntry {
  productId: number
  handle: string
  title: string
  totalInventory: number
  hasDiscount: boolean
  discountPercent: number
  createdAt: string
  ageInDays: number
  isSlowMover: boolean
  isLowStock: boolean
  tags: string[]
}

interface MarketingConfig {
  archiveSale: {
    active: boolean
    headline: string
    subheadline: string
    discountPercent: number
    discountCode: string
    shopifyDiscountUrl: string
    endsAt: string | null
    totalInventoryRemaining: number | null
  }
  homepage: {
    showArchiveBanner: boolean
    featuredMessage: string
    urgencyBadge: string | null
  }
  instagram: {
    caption: string
    hashtags: string[]
    generatedAt: string | null
  }
  email: {
    subjectLine: string
    previewText: string
    generatedAt: string | null
  }
  lastUpdated: string
  agentVersion: string
}

// ── Paths ──────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..')
const INVENTORY_CACHE_PATH = path.join(ROOT, 'lib', 'shopify-inventory-cache.json')
const MARKETING_CONFIG_PATH = path.join(ROOT, 'lib', 'marketing-config.json')

// ── Shopify ────────────────────────────────────────────────────────────────

async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN ?? 'hfvy1s-cu.myshopify.com'
  const token = process.env.SHOPIFY_ADMIN_TOKEN

  if (!token) {
    console.warn('[agent] SHOPIFY_ADMIN_TOKEN not set — skipping live Shopify sync')
    return []
  }

  const url = `https://${domain}/admin/api/2024-01/products.json?status=active&limit=250`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
  })

  if (!res.ok) {
    console.error(`[agent] Shopify API error ${res.status}: ${await res.text()}`)
    return []
  }

  const data = await res.json() as { products: ShopifyProduct[] }
  return data.products
}

function buildInventoryCache(products: ShopifyProduct[]): InventoryEntry[] {
  const now = Date.now()
  const MS_PER_DAY = 1000 * 60 * 60 * 24

  return products.map((p) => {
    const totalInventory = p.variants.reduce((sum, v) => sum + (v.inventory_quantity ?? 0), 0)
    const discountedVariant = p.variants.find(
      (v) => v.compare_at_price && parseFloat(v.compare_at_price) > parseFloat(v.price),
    )
    const hasDiscount = !!discountedVariant
    let discountPercent = 0
    if (discountedVariant?.compare_at_price) {
      const orig = parseFloat(discountedVariant.compare_at_price)
      const sale = parseFloat(discountedVariant.price)
      discountPercent = Math.round(((orig - sale) / orig) * 100)
    }

    const ageInDays = Math.floor((now - new Date(p.created_at).getTime()) / MS_PER_DAY)
    const isSlowMover = totalInventory > 30 && ageInDays > 60
    const isLowStock = totalInventory > 0 && totalInventory <= 10

    return {
      productId: p.id,
      handle: p.handle,
      title: p.title,
      totalInventory,
      hasDiscount,
      discountPercent,
      createdAt: p.created_at,
      ageInDays,
      isSlowMover,
      isLowStock,
      tags: p.tags ? p.tags.split(',').map((t) => t.trim()) : [],
    }
  })
}

// ── Gemini AI Copy Generation ──────────────────────────────────────────────

async function generateCopyWithGemini(
  slowMovers: InventoryEntry[],
  totalInventory: number,
): Promise<{ instagram: string; emailSubject: string; emailPreview: string; archiveHeadline: string }> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.warn('[agent] GEMINI_API_KEY not set — using default copy')
    return {
      instagram:
        'Archive Drop is live. Previous collections. Up to 40% off. Once it\'s gone it\'s gone. Link in bio. #SMK #SelfMadeKing #949 #OrangeCounty #Streetwear',
      emailSubject: 'Archive Drop — Up to 40% Off. Limited inventory remaining.',
      emailPreview: "Previous collections. Once it's gone, it's gone.",
      archiveHeadline: 'Archive Drop',
    }
  }

  const slowMoverList = slowMovers
    .slice(0, 5)
    .map((p) => `- ${p.title} (${p.totalInventory} units, ${p.ageInDays} days old)`)
    .join('\n')

  const prompt = `You are the voice of SMK Streetwear — a premium Orange County streetwear brand. 
The brand aesthetic is premium, exclusive, almost "Aime Leon Dore meets Acronym". 
Dark, minimal, exclusive. NOT loud sale energy. Think "archive access" not "clearance".
Brand tagline: Self Made King. IGBBMN (It's Gonna Be Me Nigga).

We have an Archive Drop with ${totalInventory} total units remaining.
Slow-moving inventory that needs to move:
${slowMoverList || 'General archive inventory'}

Generate the following. Return ONLY valid JSON with these exact keys:
{
  "instagram": "Instagram caption (2-4 lines max, no emoji spam, 3-5 relevant hashtags at end)",
  "emailSubject": "Email subject line (under 50 chars, no clickbait)",
  "emailPreview": "Email preview text (under 80 chars)",
  "archiveHeadline": "2-3 word archive section headline (e.g. 'Archive Drop', 'Season Vault', 'Final Inventory')"
}`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      },
    )

    if (!res.ok) {
      console.error(`[agent] Gemini API error ${res.status}`)
      throw new Error('Gemini request failed')
    }

    const data = await res.json() as any
    if (data.error) {
      console.error(`[agent] Gemini API returned error:`, data.error)
      throw new Error(`Gemini API error: ${data.error.message}`)
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
    
    // Strip markdown code blocks if present
    const cleanText = text.replace(/^```json/m, '').replace(/```$/m, '').trim()
    
    return JSON.parse(cleanText)
  } catch (err) {
    console.error('[agent] Gemini generation failed:', err)
    return {
      instagram:
        'Archive Drop is live. Previous collections. Up to 40% off. Limited inventory — once it\'s gone, it\'s gone. #SMK #SelfMadeKing #ArchiveDrop',
      emailSubject: 'Archive Drop — While Supplies Last',
      emailPreview: "Previous collections. Once gone, never restocked.",
      archiveHeadline: 'Archive Drop',
    }
  }
}

// ── Marketing Config Update ────────────────────────────────────────────────

function readMarketingConfig(): MarketingConfig {
  try {
    const raw = fs.readFileSync(MARKETING_CONFIG_PATH, 'utf-8')
    return JSON.parse(raw) as MarketingConfig
  } catch {
    throw new Error(`[agent] Could not read ${MARKETING_CONFIG_PATH}`)
  }
}

function writeMarketingConfig(config: MarketingConfig): void {
  fs.writeFileSync(MARKETING_CONFIG_PATH, JSON.stringify(config, null, 2) + '\n', 'utf-8')
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🤖 SMK Marketing Agent — ${new Date().toISOString()}\n`)

  // 1. Fetch Shopify products
  console.log('📦 Syncing Shopify inventory...')
  const products = await fetchShopifyProducts()
  const inventory = buildInventoryCache(products)

  // Write inventory cache
  fs.writeFileSync(INVENTORY_CACHE_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), products: inventory }, null, 2) + '\n', 'utf-8')
  console.log(`   ✓ Synced ${products.length} products`)

  // 2. Identify slow movers and low-stock items
  const slowMovers = inventory.filter((p) => p.isSlowMover)
  const lowStock = inventory.filter((p) => p.isLowStock)
  const totalInventory = inventory.reduce((sum, p) => sum + p.totalInventory, 0)
  const hasArchiveWorthy = slowMovers.length > 0 || inventory.some((p) => p.hasDiscount)

  console.log(`\n📊 Inventory Summary:`)
  console.log(`   Total units: ${totalInventory}`)
  console.log(`   Slow movers: ${slowMovers.length}`)
  console.log(`   Low stock: ${lowStock.length}`)

  if (slowMovers.length > 0) {
    console.log('\n⚠️  Slow movers (>30 units, >60 days old):')
    slowMovers.forEach((p) => console.log(`   - ${p.title}: ${p.totalInventory} units, ${p.ageInDays}d old`))
  }

  if (lowStock.length > 0) {
    console.log('\n🔥 Low stock (≤10 units):')
    lowStock.forEach((p) => console.log(`   - ${p.title}: ${p.totalInventory} units remaining`))
  }

  // 3. Generate AI copy
  console.log('\n✍️  Generating marketing copy with Gemini...')
  const copy = await generateCopyWithGemini(slowMovers, totalInventory)
  console.log(`   ✓ Instagram: ${copy.instagram.slice(0, 60)}...`)
  console.log(`   ✓ Email subject: ${copy.emailSubject}`)
  console.log(`   ✓ Archive headline: ${copy.archiveHeadline}`)

  // 4. Update marketing-config.json
  console.log('\n📝 Updating marketing-config.json...')
  const config = readMarketingConfig()
  const now = new Date().toISOString()

  config.archiveSale.active = hasArchiveWorthy || config.archiveSale.active
  config.archiveSale.headline = copy.archiveHeadline
  config.archiveSale.totalInventoryRemaining = totalInventory
  config.homepage.showArchiveBanner = config.archiveSale.active
  config.homepage.urgencyBadge = lowStock.length > 0
    ? `${lowStock.length} styles nearly sold out`
    : null
  config.instagram.caption = copy.instagram
  config.instagram.generatedAt = now
  config.email.subjectLine = copy.emailSubject
  config.email.previewText = copy.emailPreview
  config.email.generatedAt = now
  config.lastUpdated = now

  writeMarketingConfig(config)
  console.log('   ✓ marketing-config.json updated')

  // 5. Print PR summary
  const summary = `
## 🤖 SMK Marketing Agent — ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

### Inventory
| Metric | Value |
|--------|-------|
| Total units | ${totalInventory} |
| Slow movers | ${slowMovers.length} |
| Low stock alerts | ${lowStock.length} |

### Generated Copy
**Instagram caption:**
> ${copy.instagram}

**Email subject:** ${copy.emailSubject}

**Archive headline:** ${copy.archiveHeadline}

${slowMovers.length > 0 ? `### ⚠️ Slow Movers — Consider Deeper Discount\n${slowMovers.map((p) => `- **${p.title}**: ${p.totalInventory} units, ${p.ageInDays} days old`).join('\n')}` : ''}

${lowStock.length > 0 ? `### 🔥 Low Stock — Update Urgency Messaging\n${lowStock.map((p) => `- **${p.title}**: Only ${p.totalInventory} units left`).join('\n')}` : ''}

---
*Automated by SMK Marketing Agent. Review and merge to deploy.*
`

  console.log('\n' + '─'.repeat(60))
  console.log('PR_BODY<<EOF')
  console.log(summary)
  console.log('EOF')
  console.log('─'.repeat(60))

  // Write PR body to a temp file for the GitHub Actions workflow to pick up
  fs.writeFileSync(path.join(ROOT, '.agent-pr-body.md'), summary, 'utf-8')
  console.log('\n✅ Agent run complete.\n')
}

main().catch((err) => {
  console.error('[agent] Fatal error:', err)
  process.exit(1)
})
