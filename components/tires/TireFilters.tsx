'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { TIRE_TYPE_LABELS } from '@/lib/utils'
import { X } from 'lucide-react'

const brands = ['Michelin', 'Goodyear', 'Bridgestone', 'Cooper', 'Firestone', 'Falken', 'Nexen', 'Pirelli']
const types = Object.entries(TIRE_TYPE_LABELS)

export default function TireFilters({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const router = useRouter()
  const [minPrice, setMinPrice] = useState(searchParams.minPrice ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice ?? '')

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/tires?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = () => router.push('/tires')

  const hasFilters = Object.values(searchParams).some(Boolean)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Filters</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
            <X className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      {/* Brand */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-red-600">
              <input
                type="radio"
                name="brand"
                checked={searchParams.brand === brand}
                onChange={() => updateFilter('brand', searchParams.brand === brand ? '' : brand)}
                className="accent-red-600"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Tire Type</h4>
        <div className="space-y-2">
          {types.map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer hover:text-red-600">
              <input
                type="radio"
                name="type"
                checked={searchParams.type === key}
                onChange={() => updateFilter('type', searchParams.type === key ? '' : key)}
                className="accent-red-600"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => updateFilter('minPrice', minPrice)}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => updateFilter('maxPrice', maxPrice)}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
        <button
          onClick={() => { updateFilter('minPrice', minPrice); updateFilter('maxPrice', maxPrice) }}
          className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1.5 rounded-lg transition-colors"
        >
          Apply Price
        </button>
      </div>
    </div>
  )
}
