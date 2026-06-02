'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Calendar, Car, User, LogOut } from 'lucide-react'
import { formatPrice, formatDate, SERVICE_TYPE_LABELS } from '@/lib/utils'

const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
  READY_FOR_PICKUP: 'Ready for Pickup',
  INSTALLED: 'Installed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'orders' | 'appointments' | 'profile'>('orders')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login')
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetch('/api/orders').then(r => r.json()).then(setOrders).catch(() => {})
      fetch('/api/appointments').then(r => r.json()).then(setAppointments).catch(() => {})
    }
  }, [session])

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full" /></div>
  }

  if (!session) return null

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">My Account</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">My Account</h1>
            <p className="text-gray-600">Welcome back, {session.user?.name ?? session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { key: 'orders', label: 'Orders', icon: Package },
            { key: 'appointments', label: 'Appointments', icon: Calendar },
            { key: 'profile', label: 'Profile', icon: User },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === key ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold">No orders yet</p>
                <Link href="/tires" className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                  Shop Tires
                </Link>
              </div>
            ) : orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Order #{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-700'
                      : order.status === 'CANCELLED' ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                    }`}>
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                    <p className="font-black text-gray-900 mt-1">{formatPrice(order.total)}</p>
                  </div>
                </div>
                {order.items?.map((item: any) => (
                  <div key={item.id} className="text-sm text-gray-600 flex justify-between py-1 border-t border-gray-50">
                    <span>{item.tire?.brand} {item.tire?.model} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold">No appointments yet</p>
                <Link href="/appointments" className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                  Book Now
                </Link>
              </div>
            ) : appointments.map((appt) => (
              <div key={appt.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{SERVICE_TYPE_LABELS[appt.serviceType] ?? appt.serviceType}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {formatDate(appt.date)} at {appt.timeSlot}
                    </p>
                    {appt.vehicleMake && (
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <Car className="w-3.5 h-3.5" /> {appt.vehicleYear} {appt.vehicleMake} {appt.vehicleModel}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    appt.status === 'COMPLETED' ? 'bg-green-100 text-green-700'
                    : appt.status === 'CANCELLED' ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                  }`}>
                    {APPOINTMENT_STATUS_LABELS[appt.status] ?? appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-md">
            <h2 className="font-bold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold">{session.user?.name ?? '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-semibold">{session.user?.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Role</span><span className="font-semibold capitalize">{(session.user as any)?.role?.toLowerCase() ?? 'Customer'}</span></div>
            </div>
            {(session.user as any)?.role === 'ADMIN' && (
              <Link href="/admin" className="mt-6 block w-full text-center bg-red-600 text-white py-2.5 rounded-lg font-bold hover:bg-red-700 transition-colors">
                Go to Admin Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
