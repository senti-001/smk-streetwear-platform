export type CollectionSlug =
  | 'archive'
  | 'new-drops'

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
  colorImages?: Record<string, string>
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
    slug: 'archive',
    name: 'Archive',
    tagline: 'The Vault.',
    description: 'Past pieces. Sold out and never returning.',
  },
  {
    slug: 'new-drops',
    name: 'New Drops',
    tagline: 'Just landed.',
    description: 'The latest heavy-hitters fresh out of Orange County.',
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'p14',
    slug: 'igbbmn-tee',
    name: 'IGBBMN Tee',
    price: 40,
    compareAtPrice: 55,
    collection: 'archive',
    category: 'Tops',
    image: '/products/igbbmn-tee.png',
    images: ['/products/igbbmn-tee.png', '/products/igbbmn-tee-black.png', '/artwork/federal-reserve-hundred.png'],
    colors: ['White', 'Black'],
    colorImages: {
      'White': '/products/igbbmn-tee.png',
      'Black': '/products/igbbmn-tee-black.png'
    },
    sizes: ['L', 'XL', '2XL'],
    description:
      'Heavyweight crewneck tee featuring the iconic IGBBMN $100 bill artwork bold across the front. Raw dark energy.',
    details: [
      'Printed on Gildan Heavy Cotton blanks',
      'Boxy oversized fit',
      'Full front graphic print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 45,
    featured: true,
  },
  {
    id: 'p20',
    slug: 'igbbmn-hoodie',
    name: 'IGBBMN Hoodie',
    price: 95,
    compareAtPrice: 135,
    collection: 'archive',
    category: 'Fleece',
    image: '/products/igbbmn-hoodie.png',
    images: ['/products/igbbmn-hoodie.png', '/products/Gemini_Generated_Image_hink30hink30hink.png', '/artwork/federal-reserve-hundred.png'],
    colors: ['White', 'Black'],
    sizes: ['L', 'XL', '2XL'],
    description:
      'The IGBBMN Federal Reserve artwork on a premium 500gsm heavyweight hoodie. Keep warm and stay dangerous.',
    details: [
      '500gsm brushed-back fleece',
      'Oversized drop-shoulder fit',
      'Full-color front graphic',
      'Double-lined hood',
    ],
    status: 'new',
    inventory: 30,
    featured: true,
  },
  {
    id: 'p17',
    slug: 'smk-smoke-stacks-tee',
    name: 'SMK Smoke & Stacks Tee',
    price: 45,
    compareAtPrice: 65,
    collection: 'archive',
    category: 'Tops',
    image: '/products/smk-smoke-stacks-tee.png',
    images: ['/products/smk-smoke-stacks-tee.png'],
    colors: ['Black'],
    sizes: ['L', 'XL', '2XL'],
    description:
      'The Smoke & Stacks Lifestyle tee. Featuring the iconic photo of raw SMK energy. Heavyweight black blank, premium print.',
    details: [
      'Printed on Gildan Heavy Cotton blanks',
      'Boxy oversized fit',
      'High-resolution photo print',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 50,
    featured: true,
  },
  {
    id: 'p18',
    slug: 'smk-orange-county-tee',
    name: 'SMK Orange County Tee',
    price: 35,
    compareAtPrice: 52,
    collection: 'archive',
    category: 'Tops',
    image: '/products/smk-orange-county-tee.png',
    images: ['/products/smk-orange-county-tee.png'],
    colors: ['Black'],
    sizes: ['L', 'XL', '2XL'],
    description:
      'Classic Orange County streetwear. Heavyweight black tee featuring the SMK crown and shield graphic in bold orange.',
    details: [
      'Printed on Gildan Heavy Cotton blanks',
      'Boxy, structured fit',
      'Orange County Shield graphic',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 60,
    featured: true,
  },

  {
    id: 'p15',
    slug: 'self-made-king-script-tee',
    name: 'Self Made King Script Tee',
    price: 35,
    compareAtPrice: 52,
    collection: 'archive',
    category: 'Tops',
    image: '/products/self-made-king-script-tee.png',
    images: ['/products/self-made-king-script-tee.png'],
    colors: ['Black'],
    sizes: ['L', 'XL', '2XL'],
    description:
      'Classic heavyweight tee with elegant script lettering at the neckline. Understated luxury for the modern king.',
    details: [
      'Printed on Gildan Heavy Cotton blanks',
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
    price: 40,
    compareAtPrice: 58,
    collection: 'archive',
    category: 'Tops',
    image: '/products/gorilla-king-tee.png',
    images: ['/products/gorilla-king-tee.png'],
    colors: ['Black'],
    sizes: ['L', 'XL', '2XL'],
    description:
      'The Gorilla King. Featuring a crowned gorilla in oil-painting style and graffiti lettering. Pure power.',
    details: [
      'Printed on Gildan Heavy Cotton blanks',
      'Boxy, structured fit',
      'Large front graphic',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 40,
    featured: true,
  },


  {
    id: 'p33',
    slug: '949-stealth-hoodie',
    name: '949 Stealth Hoodie',
    price: 125,
    collection: 'new-drops',
    category: 'Fleece',
    image: '/products/smk_949_expanded_6.png',
    images: ['/products/smk_949_expanded_6.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description:
      'Premium heavyweight stealth hoodie. Subtle 949 front neck detail, left cuff crown, and lower back cursive script.',
    details: [
      'Premium heavyweight cotton',
      'Oversized street fit',
      'Pre-shrunk & garment washed',
      'Ribbed collar & cuffs',
    ],
    status: 'new',
    inventory: 50,
    featured: true,
  },
  {
    id: 'p35',
    slug: '949-stealth-tee',
    name: '949 Stealth Tee',
    price: 75,
    collection: 'new-drops',
    category: 'Tops',
    image: '/products/smk_949_tee_2.png',
    images: ['/products/smk_949_tee_2.png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description:
      'The 949 Stealth Long Sleeve Tee. Area code staples designed for the streets of Orange County.',
    details: [
      'Printed on Gildan Heavy Cotton blanks',
      'Oversized street fit',
      'Subtle tonal branding',
    ],
    status: 'new',
    inventory: 50,
    featured: true,
  },
  {
    id: 'p36',
    slug: 'monogram-tech-tee',
    name: 'Monogram Tech Tee',
    price: 65,
    collection: 'new-drops',
    category: 'Tops',
    image: '/products/monogram_tech_tee (1).png',
    images: ['/products/monogram_tech_tee (1).png'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'High-performance tech fabric featuring our signature monogram. Built for the modern king.',
    details: [
      'Premium tech blend',
      'Athletic fit',
      'Moisture-wicking',
    ],
    status: 'new',
    inventory: 50,
    featured: true,
  },
  {
    id: 'p37',
    slug: '949-heavyweight-oversized-tee',
    name: '949 Heavyweight Oversized Tee',
    price: 65,
    compareAtPrice: 85,
    collection: 'new-drops',
    category: 'Tops',
    image: '/products/949-heavyweight-oversized-tee.jpg',
    images: ['/products/949-heavyweight-oversized-tee.jpg'],
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description:
      'Signature Orange County heavy street fit. Features vertical SMK back print, crown crest logo, and 949 wrist print detail on premium pre-shrunk heavyweight cotton.',
    details: [
      'Premium Heavyweight Cotton',
      'Oversized Street Fit',
      'Ribbed Collar & Cuffs',
      'High-Resolution Vertical Back & Sleeve Print',
      'Wrist Print Detail',
      'Pre-Shrunk & Garment Washed',
      'Designed & Developed in Orange County, CA',
    ],
    status: 'new',
    inventory: 50,
    featured: true,
  },
  {
    id: 'p38',
    slug: 'smk-949-fresh-tee',
    name: 'SMK 949 Fresh Tee',
    price: 45,
    compareAtPrice: 60,
    collection: 'new-drops',
    category: 'Tops',
    image: '/products/smk_949_fresh_3.png',
    images: ['/products/smk_949_fresh_3.png'],
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description:
      'Fresh Orange County street style. The SMK 949 tee brings raw local energy with a clean, classic design.',
    details: [
      'Premium Heavyweight Cotton',
      'Classic Street Fit',
      'High-Resolution Graphic Print',
      'Pre-Shrunk & Garment Washed',
      'Designed in Orange County, CA',
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
    image: '/artwork/self-made-king-seal-blue.png',
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
  {
    id: 'art-5',
    slug: 'smk-sketch-girl',
    title: 'SMK Sketch',
    image: '/artwork/smk-sketch-girl.jpg',
    description:
      'Pencil-style sketch of the SMK lifestyle. Crown logo, smoke, and stacks.',
  },
  {
    id: 'art-6',
    slug: 'smk-alleyway-girl',
    title: 'SMK Alleyway',
    image: '/artwork/smk-alleyway-girl.jpg',
    description:
      'Raw street energy. Holding stacks in the SMK crop tee and sweatpants.',
  },
  {
    id: 'art-7',
    slug: 'night-walk-pitbull',
    title: 'Night Walk',
    image: '/artwork/night-walk-pitbull.png',
    description:
      'Model walking a Pitbull at night, wearing the SMK classic tee and sweatpants. Raw nighttime energy.',
  },
  {
    id: 'art-8',
    slug: 'truck-bed-pitbull',
    title: 'Truck Bed',
    image: '/artwork/truck-bed-pitbull.png',
    description:
      'SMK lifestyle on the back of a truck bed. Featuring the signature hoodie and a loyal Pitbull companion.',
  },
  {
    id: 'art-9',
    slug: 'smk-lifestyle-barcode',
    title: 'SMK Lifestyle Barcode',
    image: '/artwork/smk_lifestyle_3_barcode.png',
    description:
      'A local lifestyle photo repping the Self Made King barcode in Orange County.',
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
