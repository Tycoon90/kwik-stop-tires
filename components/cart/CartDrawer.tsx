'use client'

import Link from 'next/link'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'
import { formatPrice, INSTALLATION_FEE } from '@/lib/utils'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, toggleInstall } = useCart()
  const subtotal = useCart((s) => s.subtotal)()
  const installTotal = items.filter((i) => i.includesInstall).reduce((sum, i) => sum + i.quantity * INSTALLATION_FEE, 0)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-200" />
            <p className="text-gray-500">Your cart is empty</p>
            <button onClick={onClose} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Shop Tires
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 280 280" width="52" height="52"><circle cx="140" cy="140" r="122" fill="#1a1a1a"/><circle cx="140" cy="140" r="97" fill="#111"/><circle cx="140" cy="140" r="80" fill="#a0a0a0"/><circle cx="140" cy="140" r="78" fill="#c8c8c8"/>{[0,72,144,216,288].map((a,i)=>{const r=a*Math.PI/180;return<line key={i} x1={140+28*Math.cos(r)} y1={140+28*Math.sin(r)} x2={140+72*Math.cos(r)} y2={140+72*Math.sin(r)} stroke="#999" strokeWidth="11" strokeLinecap="round"/>})}<circle cx="140" cy="140" r="14" fill="#888"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{item.brand} {item.model}</p>
                      <p className="text-gray-500 text-xs">{item.size}</p>
                      <p className="text-red-600 font-bold text-sm">{formatPrice(item.price)}/ea</p>
                    </div>
                    <button onClick={() => removeItem(item.tireId)} className="text-gray-400 hover:text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
                      <button
                        onClick={() => item.quantity > 1 && updateQuantity(item.tireId, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-100 disabled:opacity-40"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.tireId, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.includesInstall}
                        onChange={() => toggleInstall(item.tireId)}
                        className="accent-red-600"
                      />
                      Install (+{formatPrice(INSTALLATION_FEE)}/tire)
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {installTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Installation</span>
                  <span>{formatPrice(installTotal)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(subtotal + installTotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full text-center text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
