'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import TireImage from '@/components/tires/TireImage'
import { Star, ShoppingCart, Calendar, Shield, Truck, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '@/lib/store'
import { formatPrice, TIRE_TYPE_LABELS, INSTALLATION_FEE } from '@/lib/utils'

export default function TireDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [tire, setTire] = useState<any>(null)
  const [quantity, setQuantity] = useState(4)
  const [includesInstall, setIncludesInstall] = useState(false)
  const [loading, setLoading] = useState(true)
  const addItem = useCart((s) => s.addItem)

  useEffect(() => {
    fetch(`/api/tires/${id}`)
      .then((r) => r.json())
      .then((data) => { setTire(data); setLoading(false) })
      .catch(() => { router.push('/tires') })
  }, [id, router])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse grid lg:grid-cols-2 gap-12">
          <div className="bg-gray-200 rounded-xl h-96" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-12 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!tire) return null

  const handleAddToCart = () => {
    addItem({
      id: `${tire.id}-${Date.now()}`,
      tireId: tire.id,
      brand: tire.brand,
      model: tire.model,
      size: tire.size,
      price: tire.price,
      quantity,
      includesInstall,
    })
    toast.success(`${tire.brand} ${tire.model} added to cart!`)
  }

  const totalPrice = tire.price * quantity + (includesInstall ? INSTALLATION_FEE * quantity : 0)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tires" className="hover:text-red-600">Tires</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{tire.brand} {tire.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-8 aspect-square">
            <TireImage
              brand={tire.brand}
              type={tire.type}
              size={380}
              className="drop-shadow-2xl"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-1">{tire.brand}</p>
            <h1 className="text-3xl font-black text-gray-900 mb-1">{tire.model}</h1>
            <p className="text-lg text-gray-600 mb-3">{tire.size} · {TIRE_TYPE_LABELS[tire.type]}</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(tire.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                ))}
              </div>
              <span className="text-gray-600 text-sm">{tire.rating.toFixed(1)} ({tire.reviewCount} reviews)</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-black text-gray-900">{formatPrice(tire.price)}</span>
                <span className="text-gray-500">per tire</span>
              </div>
              {includesInstall && <p className="text-sm text-green-600">+ {formatPrice(INSTALLATION_FEE)} installation per tire</p>}

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                  <div className="flex gap-2">
                    {[1, 2, 4].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantity(q)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${quantity === q ? 'bg-red-600 text-white border-red-600' : 'border-gray-300 text-gray-700 hover:border-red-400'}`}
                      >
                        {q} {q === 1 ? 'tire' : 'tires'}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includesInstall}
                    onChange={(e) => setIncludesInstall(e.target.checked)}
                    className="w-5 h-5 accent-red-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Add Professional Installation</p>
                    <p className="text-sm text-gray-500">+{formatPrice(INSTALLATION_FEE)} per tire — includes mount, balance & disposal</p>
                  </div>
                </label>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={tire.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <Link
                href="/appointments"
                className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-bold hover:border-red-600 hover:text-red-600 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Book Install
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8 text-center text-sm">
              {[
                { icon: Shield, label: 'Road Hazard Warranty' },
                { icon: Truck, label: 'Same-Day Available' },
                { icon: RotateCcw, label: 'Free Disposal' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                  <Icon className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Specs */}
            {tire.specs && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Specifications</h3>
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
                  {[
                    ['Speed Rating', tire.specs.speedRating],
                    ['Load Index', tire.specs.loadIndex],
                    ['Tread Depth', tire.specs.treadDepth ? `${tire.specs.treadDepth}/32"` : null],
                    ['Mileage Warranty', tire.specs.mileageWarranty ? `${tire.specs.mileageWarranty.toLocaleString()} miles` : null],
                    ['UTQG Rating', tire.specs.utqg],
                    ['Tire Type', TIRE_TYPE_LABELS[tire.type]],
                    ['Size', tire.size],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label as string} className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
