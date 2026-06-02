'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Calendar, User, LogOut, Car } from 'lucide-react'
import { formatPrice, formatDate, SERVICE_TYPE_LABELS } from '@/lib/utils'

const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending', PAID: 'Paid', READY_FOR_PICKUP: 'Ready for Pickup',
  INSTALLED: 'Installed', COMPLETED: 'Completed', CANCELLED: 'Cancelled',
}
const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  SCHEDULED: 'Scheduled', CONFIRMED: 'Confirmed', IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed', CANCELLED: 'Cancelled',
}

const statusColor = (s: string) =>
  s === 'COMPLETED' ? 'bg-green-100 text-green-700'
  : s === 'CANCELLED' ? 'bg-red-100 text-red-700'
  : 'bg-blue-100 text-blue-700'

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

  const tabs = [
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'appointments', label: 'Appointments', icon: Calendar },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">My Account</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">My Account</h1>
            <p className="text-gray-500 text-sm mt-0.5">Welcome back, {session.user?.name ?? session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 transition-colors text-sm min-h-[44px] px-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Tabs — scrollable on mobile */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-gray-100 shadow-sm p-1 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex-1 whitespace-nowrap min-h-[44px] ${
                activeTab === key ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-semibold mb-4">No orders yet</p>
                <Link href="/tires" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm min-h-[44px] flex items-center justify-center mx-auto w-fit">
                  Shop Tires
                </Link>
              </div>
            ) : orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">#{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${statusColor(order.status)}`}>
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                    <p className="font-black text-gray-900 mt-1">{formatPrice(order.total)}</p>
                  </div>
                </div>
                {order.items?.map((item: any) => (
                  <div key={item.id} className="text-sm text-gray-600 flex justify-between py-1.5 border-t border-gray-50">
                    <span className="truncate mr-2">{item.tire?.brand} {item.tire?.model} × {item.quantity}</span>
                    <span className="flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-semibold mb-4">No appointments yet</p>
                <Link href="/appointments" className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm min-h-[44px]">
                  Book Now
                </Link>
              </div>
            ) : appointments.map((appt: any) => (
              <div key={appt.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900">{SERVICE_TYPE_LABELS[appt.serviceType] ?? appt.serviceType}</p>
                    <p className="text-gray-600 text-sm mt-1">{formatDate(appt.date)} at {appt.timeSlot}</p>
                    {appt.vehicleMake && (
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <Car className="w-3.5 h-3.5 flex-shrink-0" />
                        {appt.vehicleYear} {appt.vehicleMake} {appt.vehicleModel}
                      </p>
                    )}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${statusColor(appt.status)}`}>
                    {APPOINTMENT_STATUS_LABELS[appt.status] ?? appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h2 className="font-bold text-gray-900 mb-4 text-lg">Profile Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Name</span>
                <span className="font-semibold">{session.user?.name ?? '—'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold truncate ml-4">{session.user?.email}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Role</span>
                <span className="font-semibold capitalize">{(session.user as any)?.role?.toLowerCase() ?? 'Customer'}</span>
              </div>
            </div>
            {(session.user as any)?.role === 'ADMIN' && (
              <Link href="/admin" className="mt-5 flex items-center justify-center w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors min-h-[48px]">
                Go to Admin Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
