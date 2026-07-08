export type CollectionSlug =
  | '949-made'
  | 'self-made-king'
  | 'south-oc'
  | 'federal-reserve'
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
  category: 'Tops' | 'Fleece' | 'Bottoms' | 'Outerwear' | 'Headwear'
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

export const COLLECTIONS: Collection[] = [
  {
    slug: '949-made',
    name: '949 Made',
    tagline: 'Built in the 949.',
    description:
      'Everyday essentials cut and sewn for the Orange County lifestyle. Heavyweight staples you live in.',
  },
  {
    slug: 'self-made-king',
    name: 'Self Made King',
    tagline: 'Wear the crown.',
    description:
      'The flagship line. Premium pieces carrying the SMK crown for those who built it themselves.',
  },
  {
    slug: 'south-oc',
    name: 'South OC',
    tagline: 'From the coast.',
    description:
      'Washed tones and relaxed silhouettes inspired by the South Orange County coastline.',
  },
  {
    slug: 'federal-reserve',
    name: 'Federal Reserve',
    tagline: 'Stack it up.',
    description:
      'Utility-driven bottoms and layers. Muted, hard-wearing, and built to move.',
  },
  {
    slug: 'limited-drops',
    name: 'Limited Drops',
    tagline: 'When it\u2019s gone, it\u2019s gone.',
    description:
      'Numbered, small-batch releases. Limited runs that never restock.',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    tagline: 'Finish the fit.',
    description: 'Caps, beanies, and the details that complete the look.',
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'self-made-king-heavyweight-tee',
    name: 'Self Made King Heavyweight Tee',
    price: 58,
    collection: 'self-made-king',
    category: 'Tops',
    image: '/products/self-made-king-tee.png',
    images: ['/products/self-made-king-tee.png', '/products/king-long-sleeve.png'],
    colors: ['Burnt Orange', 'Bone', 'Washed Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'A 240gsm heavyweight tee with a boxy, structured fit and the SMK crown embroidered at the chest. Garment-dyed for a lived-in feel from day one.',
    details: [
      '240gsm ring-spun combed cotton',
      'Boxy, structured fit',
      'Embroidered crown at chest',
      'Garment-dyed, pre-shrunk',
    ],
    status: 'new',
    inventory: 42,
    featured: true,
  },
  {
    id: 'p2',
    slug: '949-heavyweight-hoodie',
    name: '949 Heavyweight Hoodie',
    price: 128,
    collection: '949-made',
    category: 'Fleece',
    image: '/products/949-hoodie.png',
    images: ['/products/949-hoodie.png', '/products/south-oc-crew.png'],
    colors: ['Chocolate', 'Bone', 'Washed Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Our flagship 500gsm pullover hoodie. Double-lined hood, heavy drawcords, and a relaxed fit built to last a decade.',
    details: [
      '500gsm brushed-back fleece',
      'Double-lined hood',
      'Metal-tipped drawcords',
      'Ribbed cuffs and hem',
    ],
    status: 'core',
    inventory: 88,
    featured: true,
  },
  {
    id: 'p3',
    slug: 'south-oc-crewneck',
    name: 'South OC Crewneck',
    price: 98,
    collection: 'south-oc',
    category: 'Fleece',
    image: '/products/south-oc-crew.png',
    images: ['/products/south-oc-crew.png', '/products/949-hoodie.png'],
    colors: ['Bone', 'Chocolate'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'A washed bone crewneck in mid-weight fleece. Coastal, clean, and easy to layer year-round.',
    details: [
      '400gsm cotton-blend fleece',
      'Relaxed fit',
      'Tonal chest hit',
      'Ribbed collar, cuffs, and hem',
    ],
    status: 'core',
    inventory: 61,
    featured: true,
  },
  {
    id: 'p4',
    slug: 'federal-reserve-sweatpants',
    name: 'Federal Reserve Sweatpants',
    price: 108,
    collection: 'federal-reserve',
    category: 'Bottoms',
    image: '/products/federal-reserve-sweatpants.png',
    images: ['/products/federal-reserve-sweatpants.png'],
    colors: ['Washed Black', 'Chocolate'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Heavyweight fleece sweatpants with a tapered leg, deep pockets, and an adjustable waist. Match with the 949 Hoodie.',
    details: [
      '450gsm brushed fleece',
      'Tapered leg',
      'Elastic + drawcord waist',
      'Zip back pocket',
    ],
    status: 'core',
    inventory: 54,
  },
  {
    id: 'p5',
    slug: 'crown-snapback',
    name: 'Crown Snapback',
    price: 42,
    collection: 'accessories',
    category: 'Headwear',
    image: '/products/crown-snapback.png',
    images: ['/products/crown-snapback.png'],
    colors: ['Burnt Orange', 'Chocolate'],
    sizes: ['One Size'],
    description:
      'Structured six-panel snapback with a flat brim and 3D embroidered SMK crown. Adjustable snap closure.',
    details: [
      'Structured six-panel crown',
      'Flat brim',
      '3D embroidered crown logo',
      'Adjustable snap closure',
    ],
    status: 'new',
    inventory: 120,
    featured: true,
  },
  {
    id: 'p6',
    slug: 'limited-varsity-jacket',
    name: 'Limited Varsity Jacket',
    price: 268,
    compareAtPrice: 298,
    collection: 'limited-drops',
    category: 'Outerwear',
    image: '/products/limited-varsity-jacket.png',
    images: ['/products/limited-varsity-jacket.png'],
    colors: ['Chocolate / Bone'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'A numbered small-batch varsity jacket. Wool melton body, genuine leather sleeves, and chenille SMK patches. Limited to 150 pieces.',
    details: [
      'Wool melton body',
      'Genuine leather sleeves',
      'Chenille crown patches',
      'Numbered run of 150',
    ],
    status: 'limited',
    inventory: 12,
    featured: true,
  },
  {
    id: 'p7',
    slug: 'oc-cuffed-beanie',
    name: 'OC Cuffed Beanie',
    price: 34,
    collection: 'accessories',
    category: 'Headwear',
    image: '/products/oc-beanie.png',
    images: ['/products/oc-beanie.png'],
    colors: ['Chocolate', 'Bone', 'Burnt Orange'],
    sizes: ['One Size'],
    description:
      'A tight rib-knit cuffed beanie with a woven SMK label. Warm, minimal, everyday.',
    details: [
      '100% acrylic rib knit',
      'Fold-over cuff',
      'Woven label',
      'One size fits most',
    ],
    status: 'core',
    inventory: 200,
  },
  {
    id: 'p8',
    slug: 'king-logo-long-sleeve',
    name: 'King Logo Long Sleeve',
    price: 68,
    collection: 'self-made-king',
    category: 'Tops',
    image: '/products/king-long-sleeve.png',
    images: ['/products/king-long-sleeve.png', '/products/self-made-king-tee.png'],
    colors: ['Washed Black', 'Bone'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'A heavyweight long sleeve with sleeve-hit graphics and the SMK crown at the back. Structured, boxy, premium.',
    details: [
      '220gsm ring-spun cotton',
      'Boxy fit',
      'Sleeve-hit print',
      'Back crown graphic',
    ],
    status: 'new',
    inventory: 37,
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
