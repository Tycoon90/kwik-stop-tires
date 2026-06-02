'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/store'
import { formatPrice, INSTALLATION_FEE, TAX_RATE } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, toggleInstall } = useCart()
  const subtotal = useCart((s) => s.subtotal)()
  const installTotal = items.filter((i) => i.includesInstall).reduce((s, i) => s + i.quantity * INSTALLATION_FEE, 0)
  const tax = (subtotal + installTotal) * TAX_RATE
  const total = subtotal + installTotal + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-200" />
        <h1 className="text-2xl font-black text-gray-900">Your cart is empty</h1>
        <p className="text-gray-600">Add some tires to get started!</p>
        <Link href="/tires" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
          Shop Tires
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-black text-gray-900 mb-8">Your Cart ({items.length} item{items.length !== 1 ? 's' : ''})</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-4xl">🛞</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase">{item.brand}</p>
                        <h3 className="font-bold text-gray-900">{item.model}</h3>
                        <p className="text-sm text-gray-500">{item.size}</p>
                      </div>
                      <button onClick={() => removeItem(item.tireId)} className="text-gray-400 hover:text-red-500 p-1 h-fit">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item.tireId, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.tireId, item.quantity + 1)} className="p-2 hover:bg-gray-50">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-900 text-lg">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-xs text-gray-500">{formatPrice(item.price)}/tire</p>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.includesInstall}
                        onChange={() => toggleInstall(item.tireId)}
                        className="accent-red-600"
                      />
                      <span className="text-sm text-gray-600">
                        Add installation (+{formatPrice(INSTALLATION_FEE)}/tire = {formatPrice(INSTALLATION_FEE * item.quantity)} total)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                {installTotal > 0 && <div className="flex justify-between"><span className="text-gray-600">Installation</span><span>{formatPrice(installTotal)}</span></div>}
                <div className="flex justify-between"><span className="text-gray-600">Tax (7%)</span><span>{formatPrice(tax)}</span></div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-gray-900 text-base">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors mt-6"
              >
                Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/tires" className="block text-center text-gray-500 text-sm mt-3 hover:text-gray-700">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
