'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '@/lib/store'
import { formatPrice, INSTALLATION_FEE, TAX_RATE } from '@/lib/utils'
import { ShoppingBag, Tag } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  promoCode: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoInput, setPromoInput] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const installTotal = items.filter((i) => i.includesInstall).reduce((s, i) => s + i.quantity * INSTALLATION_FEE, 0)
  const tax = (subtotal + installTotal - discount) * TAX_RATE
  const total = subtotal + installTotal - discount + tax

  const applyPromo = async () => {
    const res = await fetch(`/api/promo?code=${promoInput}`)
    if (res.ok) {
      const { discount: d, type } = await res.json()
      const discountAmount = type === 'FIXED' ? d : (subtotal + installTotal) * (d / 100)
      setDiscount(discountAmount)
      setPromoApplied(true)
      toast.success(`Promo code applied! You saved ${formatPrice(discountAmount)}`)
    } else {
      toast.error('Invalid promo code')
    }
  }

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ ...data, items, subtotal, installTotal, tax, discount, total, promoCode: promoApplied ? promoInput : null }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) { toast.error('Checkout failed. Please try again.'); return }
    const { checkoutUrl } = await res.json()
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      clearCart()
      router.push('/account')
      toast.success('Order placed successfully!')
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / Cart / <span className="text-gray-900 font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-black text-gray-900 mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { field: 'firstName', label: 'First Name' },
                  { field: 'lastName', label: 'Last Name' },
                  { field: 'email', label: 'Email', type: 'email' },
                  { field: 'phone', label: 'Phone', type: 'tel' },
                ].map(({ field, label, type = 'text' }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      {...register(field as any)}
                      type={type}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    />
                    {errors[field as keyof FormData] && (
                      <p className="text-red-500 text-xs mt-1">{(errors[field as keyof FormData] as any)?.message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Tag className="w-4 h-4" />Promo Code</h2>
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  disabled={promoApplied}
                  placeholder="Enter promo code"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none disabled:bg-gray-50"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  disabled={!promoInput || promoApplied}
                  className="bg-gray-900 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              {promoApplied && <p className="text-green-600 text-sm mt-2">✓ Promo code applied — {formatPrice(discount)} saved</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </button>
            <p className="text-center text-xs text-gray-500">Secured by Stripe · SSL encrypted</p>
          </form>

          {/* Summary */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-fit sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 py-2 border-b border-gray-50">
                  <span className="text-2xl">🛞</span>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-gray-900">{item.brand} {item.model}</p>
                    <p className="text-gray-500">{item.size} × {item.quantity}</p>
                    {item.includesInstall && <p className="text-gray-500">+ Installation × {item.quantity}</p>}
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{formatPrice(item.price * item.quantity + (item.includesInstall ? INSTALLATION_FEE * item.quantity : 0))}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {installTotal > 0 && <div className="flex justify-between"><span className="text-gray-600">Installation</span><span>{formatPrice(installTotal)}</span></div>}
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="border-t pt-2 flex justify-between font-black text-gray-900 text-base">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
