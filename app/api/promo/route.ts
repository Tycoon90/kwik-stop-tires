import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'No code' }, { status: 400 })

  const promo = await prisma.promoCode.findUnique({ where: { code } })
  if (!promo || !promo.active) return NextResponse.json({ error: 'Invalid code' }, { status: 404 })
  if (promo.expiresAt && promo.expiresAt < new Date()) return NextResponse.json({ error: 'Expired' }, { status: 410 })

  return NextResponse.json({ discount: promo.discount, type: promo.type })
}
