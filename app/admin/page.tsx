export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatPrice, formatDate, SERVICE_TYPE_LABELS } from '@/lib/utils'
import Link from 'next/link'
import { Package, Calendar, TrendingUp, Users } from 'lucide-react'

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'ADMIN') redirect('/')

  const [totalOrders, totalAppointments, totalTires, recentOrders, todayAppointments, revenue] = await Promise.all([
    prisma.order.count().catch(() => 0),
    prisma.appointment.count().catch(() => 0),
    prisma.tire.count().catch(() => 0),
    prisma.order.findMany({
      include: { items: { include: { tire: true } }, user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }).catch(() => []),
    prisma.appointment.findMany({
      where: { date: { gte: new Date(new Date().setHours(0,0,0,0)), lt: new Date(new Date().setHours(23,59,59,999)) } },
      orderBy: { timeSlot: 'asc' },
    }).catch(() => []),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } }).catch(() => ({ _sum: { total: 0 } })),
  ])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          <span className="text-gray-900 font-medium">Admin Dashboard</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: formatPrice(revenue._sum.total ?? 0), icon: TrendingUp, color: 'text-green-600 bg-green-50' },
            { label: 'Total Orders', value: totalOrders, icon: Package, color: 'text-blue-600 bg-blue-50' },
            { label: 'Appointments', value: totalAppointments, icon: Calendar, color: 'text-purple-600 bg-purple-50' },
            { label: 'Tire SKUs', value: totalTires, icon: Users, color: 'text-orange-600 bg-orange-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-gray-900">{value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Today's Appointments</h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{todayAppointments.length}</span>
            </div>
            {todayAppointments.length === 0 ? (
              <p className="text-gray-500 text-sm">No appointments today.</p>
            ) : (
              <div className="space-y-3">
                {todayAppointments.map((appt) => (
                  <div key={appt.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded whitespace-nowrap">{appt.timeSlot}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{appt.firstName} {appt.lastName}</p>
                      <p className="text-xs text-gray-500">{SERVICE_TYPE_LABELS[appt.serviceType]}</p>
                      {appt.vehicleMake && <p className="text-xs text-gray-400">{appt.vehicleYear} {appt.vehicleMake} {appt.vehicleModel}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">#{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-gray-500">{order.user?.name ?? order.user?.email ?? 'Guest'} · {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-700'
                        : order.status === 'CANCELLED' ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                      <p className="font-bold text-gray-900 text-sm mt-0.5">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { href: '/admin/inventory', label: 'Manage Inventory', desc: 'Add, edit, remove tires' },
            { href: '/admin/orders', label: 'All Orders', desc: 'View & update order status' },
            { href: '/admin/appointments', label: 'All Appointments', desc: 'Manage scheduling' },
          ].map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow hover:border-red-200"
            >
              <h3 className="font-bold text-gray-900">{label}</h3>
              <p className="text-sm text-gray-500 mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
