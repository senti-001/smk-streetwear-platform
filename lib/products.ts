export type CollectionSlug =
  | 'self-made-king'
  | 'federal-reserve'
  | 'smoke-series'
  | '949-essentials'
  | 'limited-drops'
  | 'accessories'

export type Collection = {
  slug: CollectionSlug
  name: string
  tagline: string
  description: string
}

export type Product = {
  id: string
  slug: string
  name: string
  price: number
  compareAtPrice?: number
  collection: CollectionSlug
  category: 'Tops' | 'Fleece' | 'Bottoms' | 'Outerwear' | 'Headwear' | 'Womens'
  image: string
  images: string[]
  colors: string[]
  sizes: string[]
  description: string
  details: string[]
  status: 'new' | 'core' | 'limited' | 'sold-out'
  inventory: number
  featured?: boolean
}

export type Artwork = {
  id: string
  slug: string
  title: string
  image: string
  description: string
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'self-made-king',
    name: 'Self Made King',
    tagline: 'Wear the crown.',
    description:
      'The flagship line. Premium pieces carrying the SMK crown for those who built it themselves. Gothic lettering, smoke effects, heavyweight construction.',
  },
  {
    slug: 'federal-reserve',
    name: 'Federal Reserve',
    tagline: 'Stack it up.',
    description:
      'Money-inspired graphics and the iconic $100 bill artwork. Hundred dollar energy on heavyweight fleece and premium cotton.',
  },
  {
    slug: 'smoke-series',
    name: 'Smoke Series',
    tagline: 'Let it burn.',
    description:
      'Chrome smoke gothic lettering on blacked-out heavyweight blanks. The signature SMK look.',
  },
  {
    slug: '949-essentials',
    name: '949 Essentials',
    tagline: 'Area code staples.',
    description:
      'Everyday heavyweight basics repping the 949. Clean branding, premium construction, all black everything.',
  },
  {
    slug: 'limited-drops',
    name: 'Limited Drops',
    tagline: 'When it\u2019s gone, it\u2019s gone.',
    description:
      'Numbered, small-batch releases. Limited runs that never restock. IGBBMN.',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    tagline: 'Finish the fit.',
    description: 'Snapbacks, beanies, and the details that finish the look.',
  },
]

export const PRODUCTS: Product[] = [
  // ── Smoke Series ──
  {
    id: 'p19',
    slug: 'smk-chrome-logo-tee',
    name: 'SMK Chrome Logo Tee',
    price: 55,
    collection: 'smoke-series',
    category: 'Tops',
    image: '/products/smk-chrome-tee.png',
    images: ['/products/smk-chrome-tee.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'The signature piece. A 240gsm heavyweight tee with the SMK gothic old-english lettering in chrome smoke effect across the chest. Garment-dyed, boxy oversized fit.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy oversized fit',
      'Chrome gothic chest print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 42,
    featured: true,
  },
  // ── Federal Reserve ──

  {
    id: 'p3',
    slug: 'federal-reserve-sweatpants',
    name: 'Federal Reserve Sweatpants',
    price: 108,
    collection: 'federal-reserve',
    category: 'Bottoms',
    image: '/products/smk-sweatpants.jpg',
    images: ['/products/smk-sweatpants.jpg'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Heavyweight fleece sweatpants with SMK branding on the thigh. Tapered leg, deep pockets, drawcord waist. Match with the Federal Reserve Hoodie for the full set.',
    details: [
      '450gsm brushed fleece',
      'Tapered leg',
      'Elastic + drawcord waist',
      'SMK thigh embroidery',
    ],
    status: 'new',
    inventory: 54,
    featured: true,
  },

  // ── Self Made King ──

  {
    id: 'p5',
    slug: 'king-shit-tee',
    name: 'King Shit Tee',
    price: 55,
    collection: 'self-made-king',
    category: 'Tops',
    image: '/products/king-shit-tee.jpg',
    images: ['/products/king-shit-tee.jpg'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'KING SHIT. SELF MADE. A bold statement on a heavyweight black tee. Simple, clear, powerful.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy, structured fit',
      'Bold text chest print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 50,
    featured: true,
  },
  {
    id: 'p15',
    slug: 'self-made-king-script-tee',
    name: 'Self Made King Script Tee',
    price: 52,
    collection: 'self-made-king',
    category: 'Tops',
    image: '/products/self-made-king-script-tee.png',
    images: ['/products/self-made-king-script-tee.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Classic heavyweight tee with elegant script lettering at the neckline. Understated luxury for the modern king.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy, structured fit',
      'Neckline script print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 45,
    featured: true,
  },
  {
    id: 'p16',
    slug: 'gorilla-king-tee',
    name: 'Gorilla King Tee',
    price: 58,
    collection: 'self-made-king',
    category: 'Tops',
    image: '/products/gorilla-king-tee.png',
    images: ['/products/gorilla-king-tee.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'The Gorilla King. Featuring a crowned gorilla in oil-painting style and graffiti lettering. Pure power.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy, structured fit',
      'Large front graphic',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 40,
    featured: true,
  },


  {
    id: 'p18',
    slug: 'smk-orange-county-tee',
    name: 'SMK Orange County Tee',
    price: 52,
    collection: '949-essentials',
    category: 'Tops',
    image: '/products/smk-orange-county-tee.png',
    images: ['/products/smk-orange-county-tee.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Classic Orange County streetwear. Heavyweight black tee featuring the SMK crown and shield graphic in bold orange.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy, structured fit',
      'Orange County Shield graphic',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 60,
    featured: true,
  },

  // ── 949 Essentials ──



  // ── Accessories ──
  {
    id: 'p9',
    slug: 'smk-gothic-snapback',
    name: 'SMK Gothic Snapback',
    price: 42,
    collection: 'accessories',
    category: 'Headwear',
    image: '/products/smk-snapback.jpg',
    images: ['/products/smk-snapback.jpg'],
    colors: ['Black'],
    sizes: ['One Size'],
    description:
      'Structured six-panel snapback with SMK embroidered in white gothic old-english lettering. Flat brim, adjustable snap closure.',
    details: [
      'Structured six-panel crown',
      'Flat brim',
      'Gothic SMK embroidery',
      'Adjustable snap closure',
    ],
    status: 'new',
    inventory: 120,
    featured: true,
  },


  // ── Limited Drops ──

  // ── Gorilla King ──
  {
    id: 'p13',
    slug: 'cocaine-breakfast-hoodie',
    name: 'Cocaine Breakfast Hoodie',
    price: 135,
    collection: 'limited-drops',
    category: 'Fleece',
    image: '/products/cocaine-breakfast-hoodie.png',
    images: ['/products/cocaine-breakfast-hoodie.png'],
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Start the day right. The Cocaine Breakfast hoodie features a wild squirrel graphic. Pure energy in limited numbers.',
    details: [
      '500gsm brushed-back fleece',
      'Oversized drop-shoulder fit',
      'Full-color front graphic',
      'Double-lined hood',
    ],
    status: 'limited',
    inventory: 20,
    featured: true,
  },

  {
    id: 'p14',
    slug: 'igbbmn-tee',
    name: 'IGBBMN Tee',
    price: 55,
    collection: 'federal-reserve',
    category: 'Tops',
    image: '/products/igbbmn-tee.png',
    images: ['/products/igbbmn-tee.png', '/artwork/federal-reserve-hundred.png'],
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Heavyweight crewneck tee featuring the iconic IGBBMN $100 bill artwork bold across the front. Raw dark energy.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy oversized fit',
      'Full front graphic print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 45,
    featured: true,
  },
  {
    id: 'p17',
    slug: 'smk-smoke-stacks-tee',
    name: 'SMK Smoke & Stacks Tee',
    price: 65,
    collection: 'self-made-king',
    category: 'Tops',
    image: '/products/smk-smoke-stacks-tee.png',
    images: ['/products/smk-smoke-stacks-tee.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'The Smoke & Stacks Lifestyle tee. Featuring the iconic photo of raw SMK energy. Heavyweight black blank, premium print.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy oversized fit',
      'High-resolution photo print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 50,
    featured: true,
  },
]

// ── Artwork gallery ──
export const ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    slug: 'federal-reserve-of-smk',
    title: 'Federal Reserve of SMK',
    image: '/artwork/federal-reserve-hundred.png',
    description:
      'The iconic Federal Reserve of SMK $100 bill. IGBBMN. Series 949. Self Made. Orange County, California.',
  },
  {
    id: 'art-2',
    slug: 'self-made-king-seal',
    title: 'Self Made King Seal',
    image: '/artwork/self-made-king-seal-blue.jpg',
    description:
      'The Self Made King seal. Orange County. Blue bandana portrait with SMK OC chest tattoos in vintage engraving style.',
  },
  {
    id: 'art-3',
    slug: 'smk-crown-hundred',
    title: 'SMK Crown Hundred',
    image: '/artwork/smk-crown-hundred.jpg',
    description:
      'SMK Self Made King crown logo over Benjamin Franklin in a bandana. The $100 bill with the cash roll. Smoke and dark energy.',
  },
  {
    id: 'art-4',
    slug: 'smoke-and-stacks',
    title: 'Smoke and Stacks',
    image: '/artwork/smk-smoke-stacks.jpg',
    description:
      'The pure essence of Self Made King. Chrome smoke gothic logo over heavy stacks of hundreds.',
  },
]

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export function productsByCollection(slug: CollectionSlug) {
  return PRODUCTS.filter((p) => p.collection === slug)
}

export function relatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.collection === product.collection,
  )
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.collection !== product.collection))
    .slice(0, limit)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}
