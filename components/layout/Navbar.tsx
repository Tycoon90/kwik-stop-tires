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

  const close = () => setMobileOpen(false)

  return (
    <>
      {/* Top bar */}
      <div className="bg-red-700 text-white text-xs sm:text-sm py-1.5 px-4 text-center">
        <span className="flex items-center justify-center gap-2 flex-wrap">
          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
          <a href="tel:9169683262" className="hover:underline font-medium">(916) 968-3262</a>
          <span className="hidden sm:inline mx-1">|</span>
          <span className="hidden sm:inline">Mon–Fri 8am–6pm · Sat 8am–5pm</span>
        </span>
      </div>

      <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile: logo center, cart left, hamburger right */}
          <div className="flex items-center justify-between h-16">

            {/* Cart (mobile left slot) */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-gray-300 hover:text-white p-2 lg:hidden"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Logo — centered on mobile, left on desktop */}
            <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0" onClick={close}>
              <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0">K</div>
              <div className="text-white font-bold leading-tight">
                <div className="text-base">Kwik Stop</div>
                <div className="text-xs text-red-400 font-normal">Tires</div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white text-sm font-medium transition-colors whitespace-nowrap">
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop right icons */}
            <div className="hidden lg:flex items-center gap-3">
              <button onClick={() => setCartOpen(true)} className="relative text-gray-300 hover:text-white p-2 transition-colors" aria-label="Cart">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
              {session ? (
                <>
                  <Link href="/account" className="text-gray-300 hover:text-white p-2 transition-colors"><User className="w-6 h-6" /></Link>
                  {(session.user as any)?.role === 'ADMIN' && (
                    <Link href="/admin" className="bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold hover:bg-red-700 transition-colors">Admin</Link>
                  )}
                </>
              ) : (
                <Link href="/auth/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Sign In</Link>
              )}
            </div>

            {/* Hamburger (mobile right slot) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — full-width overlay */}
        {mobileOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="flex items-center justify-center text-gray-200 hover:text-white hover:bg-gray-700 py-3 px-4 rounded-lg text-base font-medium transition-colors min-h-[48px]"
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-gray-700 pt-3 mt-3 space-y-1">
                {session ? (
                  <>
                    <Link href="/account" onClick={close} className="flex items-center justify-center gap-2 text-gray-200 hover:text-white hover:bg-gray-700 py-3 px-4 rounded-lg font-medium min-h-[48px]">
                      <User className="w-4 h-4" /> My Account
                    </Link>
                    {(session.user as any)?.role === 'ADMIN' && (
                      <Link href="/admin" onClick={close} className="flex items-center justify-center bg-red-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-red-700 min-h-[48px]">
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={() => { signOut(); close() }} className="w-full text-gray-400 hover:text-white py-3 text-sm min-h-[48px]">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/auth/login" onClick={close} className="flex items-center justify-center bg-red-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-red-700 min-h-[48px]">
                    Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
