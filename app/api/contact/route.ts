import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  // Send via Resend if configured
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'noreply@kwikstoptires.com',
      to: process.env.STORE_EMAIL ?? 'info@kwikstoptires.com',
      subject: `Contact Form: ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    })
  }

  return NextResponse.json({ ok: true })
}
