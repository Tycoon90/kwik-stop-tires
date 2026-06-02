import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const data = await req.json()

  const appointment = await prisma.appointment.create({
    data: {
      userId: (session?.user as any)?.id ?? null,
      serviceType: data.serviceType,
      date: new Date(data.date),
      timeSlot: data.timeSlot,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      vehicleYear: data.vehicleYear ? parseInt(data.vehicleYear) : null,
      vehicleMake: data.vehicleMake ?? null,
      vehicleModel: data.vehicleModel ?? null,
      licensePlate: data.licensePlate ?? null,
      notes: data.notes ?? null,
    },
  })

  return NextResponse.json(appointment, { status: 201 })
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const userId = (session.user as any)?.id
  const role = (session.user as any)?.role

  const where = role === 'ADMIN' ? {} : { userId }
  const appointments = await prisma.appointment.findMany({
    where,
    orderBy: { date: 'desc' },
    take: 50,
  })
  return NextResponse.json(appointments)
}
