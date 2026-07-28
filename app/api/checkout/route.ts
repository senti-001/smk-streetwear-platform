import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  try {
    const { items, discountCode } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Get the base URL for success/cancel redirects and images
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Format line items for Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: item.product.images.map((img: string) => {
            return img.startsWith('http') ? img : `${origin}${img}`
          }),
          description: `Size: ${item.size} | Color: ${item.color}`,
        },
        unit_amount: Math.round(item.product.price * 100), // Convert dollars to cents
      },
      quantity: item.quantity,
    }))

    // Calculate subtotal to determine shipping cost
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    )

    // Shipping fee: $8 if subtotal < $150, else Free
    const shippingCost = subtotal >= 150 ? 0 : 800 // in cents

    // Create Checkout Sessions from body params.
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Adjust as needed
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingCost,
              currency: 'usd',
            },
            display_name: shippingCost === 0 ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      line_items,
      mode: 'payment',
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
    }

    if (discountCode) {
      sessionParams.discounts = [{ coupon: discountCode }]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe Error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
