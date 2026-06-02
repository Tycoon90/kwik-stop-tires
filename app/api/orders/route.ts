import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { authOptions } from '@/lib/auth'
import { INSTALLATION_FEE } from '@/lib/utils'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const body = await req.json()
  const { items, subtotal, installTotal, tax, discount, total, promoCode, firstName, lastName, email, phone } = body

  const order = await prisma.order.create({
    data: {
      userId: (session?.user as any)?.id ?? undefined,
      status: 'PENDING',
      subtotal,
      tax,
      installFee: installTotal,
      discount: discount ?? 0,
      total,
      promoCode,
      items: {
        create: items.map((item: any) => ({
          tireId: item.tireId,
          quantity: item.quantity,
          price: item.price,
          includesInstall: item.includesInstall,
        })),
      },
    },
  })

  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_...') {
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: `${item.brand} ${item.model} (${item.size}) × ${item.quantity}` },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    if (installTotal > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Professional Installation' },
          unit_amount: INSTALLATION_FEE * 100,
        },
        quantity: items.filter((i: any) => i.includesInstall).reduce((s: number, i: any) => s + i.quantity, 0),
      })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/account?order=${order.id}&success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      customer_email: email,
      metadata: { orderId: order.id },
    })

    await prisma.order.update({ where: { id: order.id }, data: { stripePaymentId: checkoutSession.id } })
    return NextResponse.json({ checkoutUrl: checkoutSession.url })
  }

  return NextResponse.json({ orderId: order.id })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any)?.id
  const role = (session.user as any)?.role
  const where = role === 'ADMIN' ? {} : { userId }

  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { tire: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return NextResponse.json(orders)
}
