'use client'

import Link from 'next/link'
import { Star, ShoppingCart, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '@/lib/store'
import { formatPrice, TIRE_TYPE_LABELS } from '@/lib/utils'
import TireImage from './TireImage'

interface TireCardProps {
  tire: {
    id: string
    brand: string
    model: string
    size: string
    price: number
    type: string
    image?: string | null
    rating: number
    reviewCount: number
    stock: number
  }
}

export default function TireCard({ tire }: TireCardProps) {
  const addItem = useCart((s) => s.addItem)

  const handleAddToCart = () => {
    addItem({
      id: `${tire.id}-${Date.now()}`,
      tireId: tire.id,
      brand: tire.brand,
      model: tire.model,
      size: tire.size,
      image: tire.image ?? undefined,
      price: tire.price,
      quantity: 4,
      includesInstall: false,
    })
    toast.success(`${tire.brand} ${tire.model} added to cart!`)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden group flex flex-col">
      <Link href={`/tires/${tire.id}`}>
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-52 flex items-center justify-center overflow-hidden">
          <TireImage
            brand={tire.brand}
            type={tire.type}
            size={180}
            className="group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
          />
          {tire.stock < 5 && tire.stock > 0 && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
              Low Stock
            </span>
          )}
          {tire.stock === 0 && (
            <span className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
              Out of Stock
            </span>
          )}
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">
            {TIRE_TYPE_LABELS[tire.type] ?? tire.type}
          </span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{tire.brand}</p>
        <Link href={`/tires/${tire.id}`}>
          <h3 className="font-bold text-gray-900 hover:text-red-600 transition-colors mt-0.5 leading-tight">{tire.model}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">{tire.size}</p>

        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.round(tire.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({tire.reviewCount})</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-black text-gray-900">{formatPrice(tire.price)}</span>
            <span className="text-xs text-gray-400">/tire</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={tire.stock === 0}
              className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 text-white text-sm py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <Link
              href="/appointments"
              className="flex items-center justify-center border border-gray-200 text-gray-600 px-3 py-2.5 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
              title="Book installation"
            >
              <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
