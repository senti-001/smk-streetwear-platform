import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Send an email to the store owner alerting them of a new subscriber
    // We send from onboarding@resend.dev which is allowed on the free tier without domain verification
    // But it must be sent TO the email address associated with the Resend account (williamtflynn@gmail.com)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'williamtflynn@gmail.com',
      subject: 'New SMK Newsletter Subscriber!',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Newsletter Subscriber 👑</h2>
          <p>A new customer has signed up for the Self Made King drops:</p>
          <p style="font-size: 18px; font-weight: bold; padding: 10px; background: #f4f4f5; border-radius: 4px;">
            ${email}
          </p>
          <p style="color: #52525b; font-size: 14px;">Save this email to your marketing list!</p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
