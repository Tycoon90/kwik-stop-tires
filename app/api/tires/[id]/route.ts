import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const tire = await prisma.tire.findUnique({
    where: { id: params.id },
    include: { reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' }, take: 10 } },
  })
  if (!tire) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(tire)
}
