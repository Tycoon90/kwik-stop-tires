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
        <Link href="/tires" className="w-full max-w-xs bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors text-center">
          Shop Tires
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-32 lg:pb-0">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">Cart</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-6">Your Cart ({items.length} item{items.length !== 1 ? 's' : ''})</h1>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 280 280" width="52" height="52"><circle cx="140" cy="140" r="122" fill="#1a1a1a"/><circle cx="140" cy="140" r="97" fill="#111"/><circle cx="140" cy="140" r="80" fill="#a0a0a0"/><circle cx="140" cy="140" r="78" fill="#c8c8c8"/>{[0,72,144,216,288].map((a,i)=>{const r=a*Math.PI/180;return<line key={i} x1={140+28*Math.cos(r)} y1={140+28*Math.sin(r)} x2={140+72*Math.cos(r)} y2={140+72*Math.sin(r)} stroke="#999" strokeWidth="11" strokeLinecap="round"/>})}<circle cx="140" cy="140" r="14" fill="#888"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{item.brand}</p>
                        <h3 className="font-bold text-gray-900 truncate">{item.model}</h3>
                        <p className="text-sm text-gray-500">{item.size}</p>
                      </div>
                      <button onClick={() => removeItem(item.tireId)} className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item.tireId, item.quantity - 1)}
                          className="p-2.5 hover:bg-gray-50 disabled:opacity-40 min-h-[44px] min-w-[44px] flex items-center justify-center"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-base">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.tireId, item.quantity + 1)} className="p-2.5 hover:bg-gray-50 min-h-[44px] min-w-[44px] flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-black text-gray-900 text-lg">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <label className="flex items-start gap-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.includesInstall}
                        onChange={() => toggleInstall(item.tireId)}
                        className="accent-red-600 mt-0.5 w-4 h-4 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-600 leading-snug">
                        Add installation (+{formatPrice(INSTALLATION_FEE)}/tire = {formatPrice(INSTALLATION_FEE * item.quantity)} total)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                {installTotal > 0 && <div className="flex justify-between"><span className="text-gray-600">Installation</span><span>{formatPrice(installTotal)}</span></div>}
                <div className="flex justify-between"><span className="text-gray-600">Tax (7%)</span><span>{formatPrice(tax)}</span></div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-gray-900 text-base">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link href="/checkout" className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors mt-5 min-h-[56px]">
                Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/tires" className="block text-center text-gray-500 text-sm mt-3 hover:text-gray-700 py-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-4 lg:hidden z-30">
        <Link href="/checkout" className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors min-h-[56px]">
          Checkout — {formatPrice(total)} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
