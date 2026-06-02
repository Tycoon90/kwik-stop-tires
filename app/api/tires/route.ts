import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const where: any = {}

  const brand = searchParams.get('brand')
  const type = searchParams.get('type')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const search = searchParams.get('search')

  if (brand) where.brand = brand
  if (type) where.type = type
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseFloat(minPrice)
    if (maxPrice) where.price.lte = parseFloat(maxPrice)
  }
  if (search) {
    where.OR = [
      { brand: { contains: search, mode: 'insensitive' } },
      { model: { contains: search, mode: 'insensitive' } },
      { size: { contains: search, mode: 'insensitive' } },
    ]
  }

  const tires = await prisma.tire.findMany({ where, take: 60, orderBy: { featured: 'desc' } })
  return NextResponse.json(tires)
}
