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
    id: 'p1',
    slug: 'smk-smoke-gothic-tee',
    name: 'SMK Smoke Gothic Tee',
    price: 58,
    collection: 'smoke-series',
    category: 'Tops',
    image: '/products/smk-smoke-tee.png',
    images: ['/products/smk-smoke-tee.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'The signature piece. A 240gsm heavyweight tee with the SMK gothic old-english lettering in chrome smoke effect across the chest. Garment-dyed, boxy oversized fit. The one that started it all.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy oversized fit',
      'Chrome smoke gothic chest print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 42,
    featured: true,
  },

  // ── Federal Reserve ──
  {
    id: 'p2',
    slug: 'federal-reserve-hoodie',
    name: 'Federal Reserve Hoodie',
    price: 148,
    collection: 'federal-reserve',
    category: 'Fleece',
    image: '/products/smk-hundred-hoodie.png',
    images: ['/products/smk-hundred-hoodie.png', '/products/smk-black-hoodie.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'The statement hoodie. 500gsm heavyweight pullover with the iconic SMK $100 bill graphic on the back — Benjamin Franklin replaced with the bandana portrait. Front features tonal SMK embroidery. Series 949.',
    details: [
      '500gsm brushed-back fleece',
      'Full $100 bill back graphic',
      'Double-lined hood',
      'Metal-tipped drawcords',
    ],
    status: 'new',
    inventory: 30,
    featured: true,
  },
  {
    id: 'p3',
    slug: 'federal-reserve-sweatpants',
    name: 'Federal Reserve Sweatpants',
    price: 108,
    collection: 'federal-reserve',
    category: 'Bottoms',
    image: '/products/smk-sweatpants.png',
    images: ['/products/smk-sweatpants.png'],
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
    id: 'p4',
    slug: 'self-made-king-heavyweight-hoodie',
    name: 'Self Made King Hoodie',
    price: 138,
    collection: 'self-made-king',
    category: 'Fleece',
    image: '/products/smk-black-hoodie.png',
    images: ['/products/smk-black-hoodie.png'],
    colors: ['Black', 'Washed Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'The crown hoodie. 500gsm pullover with gothic SMK lettering in chrome smoke across the chest. Double-lined hood, heavy drawcords, oversized relaxed fit built to last.',
    details: [
      '500gsm brushed-back fleece',
      'Chrome smoke chest graphic',
      'Double-lined hood',
      'Metal-tipped drawcords',
    ],
    status: 'core',
    inventory: 88,
    featured: true,
  },
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


  // ── Womens ──
  {
    id: 'p6',
    slug: 'smk-crop-tee',
    name: 'SMK Crop Tee',
    price: 48,
    collection: 'smoke-series',
    category: 'Womens',
    image: '/products/smk-crop-tee.png',
    images: ['/products/smk-crop-tee.png'],
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Heavyweight cropped boxy tee with bold SMK block lettering and "Orange County, CA" print. Cut at the waist, relaxed fit. Made for the queens.',
    details: [
      '200gsm ring-spun cotton',
      'Cropped boxy fit',
      'SMK chest print',
      'Garment-dyed',
    ],
    status: 'new',
    inventory: 45,
    featured: true,
  },

  // ── 949 Essentials ──
  {
    id: 'p7',
    slug: '949-heavyweight-tee',
    name: '949 Heavyweight Tee',
    price: 48,
    collection: '949-essentials',
    category: 'Tops',
    image: '/products/king-long-sleeve.png',
    images: ['/products/king-long-sleeve.png'],
    colors: ['Black', 'Washed Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'A blacked-out essential. Heavyweight long sleeve with minimal SMK branding on the sleeve and back neck. The everyday staple for the 949.',
    details: [
      '220gsm ring-spun cotton',
      'Boxy fit',
      'Sleeve-hit embroidery',
      'Back neck label',
    ],
    status: 'core',
    inventory: 72,
  },


  // ── Accessories ──
  {
    id: 'p9',
    slug: 'smk-gothic-snapback',
    name: 'SMK Gothic Snapback',
    price: 42,
    collection: 'accessories',
    category: 'Headwear',
    image: '/products/smk-snapback.png',
    images: ['/products/smk-snapback.png'],
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
    colors: ['White'],
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
    slug: 'igbbmn-white-sweatshirt',
    name: 'IGBBMN White Sweatshirt',
    price: 125,
    collection: 'federal-reserve',
    category: 'Fleece',
    image: '/products/igbbmn-front-hq.png',
    images: ['/products/igbbmn-front-hq.png', '/artwork/federal-reserve-hundred.png'],
    colors: ['White', 'Bone'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Heavyweight white crewneck sweatshirt featuring the iconic IGBBMN $100 bill artwork bold across the front. Raw dark energy.',
    details: [
      '500gsm brushed-back fleece',
      'Oversized drop-shoulder fit',
      'Full back graphic print',
      'Minimal front branding',
    ],
    status: 'new',
    inventory: 45,
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
    image: '/artwork/self-made-king-seal.png',
    description:
      'The Self Made King seal. Orange County. Red bandana portrait with SMK OC chest tattoos in vintage engraving style.',
  },
  {
    id: 'art-3',
    slug: 'smk-crown-hundred',
    title: 'SMK Crown Hundred',
    image: '/artwork/smk-crown-hundred.jpg',
    description:
      'SMK Self Made King crown logo over Benjamin Franklin in a bandana. The $100 bill with the cash roll. Smoke and dark energy.',
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
