import Stripe from 'stripe';

async function main() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2025-02-24.acacia' });
  try {
    const coupon = await stripe.coupons.create({
      id: 'ARCHIVE20',
      percent_off: 20,
      duration: 'once',
      name: 'Archive Drop 20% Off'
    });
    console.log('Created Stripe Coupon:', coupon.id);
  } catch(e: any) {
    if (e.message.includes('already exists')) {
      console.log('Coupon already exists!');
    } else {
      console.error(e);
    }
  }
}
main();
