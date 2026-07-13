import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'onboarding@resend.dev'
const ADMIN_EMAIL = 'williamtflynn@gmail.com'
const ARCHIVE_URL = 'https://smk-streetwear-platform.vercel.app/archive'
const STORE_URL = 'https://smk-streetwear-platform.vercel.app'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // ── 1. Admin notification ──────────────────────────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: '👑 New SMK Collective Member!',
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #1a1512; color: #f5f0e8;">
          <h2 style="color: #d97316;">New SMK Collective Member 👑</h2>
          <p>Someone just joined the SMK Collective:</p>
          <p style="font-size: 18px; font-weight: bold; padding: 10px; background: #2d2520; border-radius: 4px; border-left: 3px solid #d97316;">
            ${email}
          </p>
          <p style="color: #8a7a6a; font-size: 14px;">Add to your marketing list and include in your next Archive Drop blast.</p>
        </div>
      `,
    })

    // ── 2. Welcome email to subscriber ────────────────────────────────────
    // Note: On Resend free tier, can only send to verified emails or use onboarding@resend.dev
    // Once you verify your domain, change FROM_EMAIL to noreply@smkstreetwear.com
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL, // replace with `email` once domain is verified
        subject: 'Welcome to the SMK Collective 👑',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the SMK Collective</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f0e8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #1a1512;">
    
    <!-- Header -->
    <div style="background-color: #0f0d0a; padding: 32px 40px; text-align: center; border-bottom: 1px solid #2d2520;">
      <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: #d97316;">
        Self Made King
      </p>
      <h1 style="margin: 12px 0 0; font-size: 36px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; color: #f5f0e8;">
        SMK
      </h1>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <p style="margin: 0 0 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #d97316;">
        Welcome to the Collective
      </p>
      <h2 style="margin: 0 0 20px; font-size: 28px; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; color: #f5f0e8;">
        You're In.
      </h2>
      <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #c8b99a;">
        SMK was built on one idea: you made it yourself. No shortcuts. No handouts. 
        Every piece we make carries that energy — heavyweight construction, premium 
        materials, limited runs.
      </p>
      <p style="margin: 0 0 32px; font-size: 15px; line-height: 1.7; color: #c8b99a;">
        As a Collective member, you'll get first access to every drop, restock alerts, 
        and exclusive archive pricing before we announce anything publicly.
      </p>

      <!-- Divider -->
      <div style="border-top: 1px solid #2d2520; margin: 0 0 32px;"></div>

      <!-- Archive Drop CTA -->
      <div style="background-color: #0f0d0a; border: 1px solid #2d2520; border-left: 3px solid #d97316; padding: 24px; margin-bottom: 32px;">
        <p style="margin: 0 0 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: #d97316;">
          Member Exclusive
        </p>
        <h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; color: #f5f0e8;">
          Archive Drop — 20% Off
        </h3>
        <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #8a7a6a;">
          Previous collections. Limited inventory. Once it's gone, it's gone. 
          Discount applied automatically at checkout.
        </p>
        <a href="${ARCHIVE_URL}" 
           style="display: inline-block; padding: 12px 28px; background-color: #d97316; color: #f5f0e8; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;">
          Shop Archive →
        </a>
      </div>

      <!-- Footer note -->
      <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #5a4a3a;">
        IGBBMN — Orange County, California<br>
        <a href="${STORE_URL}" style="color: #d97316; text-decoration: none;">smkstreetwear.com</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #0f0d0a; padding: 24px 40px; border-top: 1px solid #2d2520; text-align: center;">
      <p style="margin: 0; font-size: 11px; color: #5a4a3a;">
        You signed up at smkstreetwear.com. 
        <a href="#" style="color: #5a4a3a;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
        `,
      })
    } catch (welcomeError) {
      // Welcome email failure is non-critical — admin notification already sent
      console.error('Welcome email failed (non-critical):', welcomeError)
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 },
    )
  }
}

