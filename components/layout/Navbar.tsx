'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/store'
import CartDrawer from '@/components/cart/CartDrawer'

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const itemCount = useCart((s) => s.itemCount)()

  const links = [
    { href: '/find-tires', label: 'Find Tires' },
    { href: '/tires', label: 'Shop Tires' },
    { href: '/services', label: 'Services' },
    { href: '/appointments', label: 'Book Appointment' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <div className="bg-red-700 text-white text-sm py-1.5 px-4 text-center">
        <span className="flex items-center justify-center gap-2">
          <Phone className="w-3.5 h-3.5" />
          <a href="tel:9169683262" className="hover:underline">(916) 968-3262</a>
          <span className="mx-2">|</span>
          Mon–Fri 8am–6pm · Sat 8am–5pm
        </span>
      </div>
      <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg">K</div>
              <div className="text-white font-bold leading-tight hidden sm:block">
                <div className="text-base">Kwik Stop</div>
                <div className="text-xs text-red-400 font-normal">Tires</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-gray-300 hover:text-white p-2 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
              {session ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/account" className="text-gray-300 hover:text-white p-2 transition-colors">
                    <User className="w-6 h-6" />
                  </Link>
                  {(session.user as any)?.role === 'ADMIN' && (
                    <Link href="/admin" className="bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold hover:bg-red-700 transition-colors">
                      Admin
                    </Link>
                  )}
                </div>
              ) : (
                <Link href="/auth/login" className="hidden sm:block text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  Sign In
                </Link>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-gray-300 hover:text-white p-2">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700 px-4 py-3 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-gray-300 hover:text-white py-2 text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/account" className="block text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>My Account</Link>
                <button onClick={() => signOut()} className="text-gray-400 hover:text-white py-2 text-sm">Sign Out</button>
              </>
            ) : (
              <Link href="/auth/login" className="block text-red-400 hover:text-red-300 py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Sign In / Register</Link>
            )}
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
