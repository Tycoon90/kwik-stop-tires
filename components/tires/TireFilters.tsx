'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { TIRE_TYPE_LABELS } from '@/lib/utils'
import { X, SlidersHorizontal } from 'lucide-react'

const brands = ['Michelin', 'Goodyear', 'Bridgestone', 'Cooper', 'Firestone', 'Falken', 'Nexen', 'Pirelli']
const types = Object.entries(TIRE_TYPE_LABELS)

function FilterContent({ searchParams, onClose }: { searchParams: Record<string, string | undefined>; onClose?: () => void }) {
  const router = useRouter()
  const [minPrice, setMinPrice] = useState(searchParams.minPrice ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice ?? '')

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/tires?${params.toString()}`)
    onClose?.()
  }, [router, searchParams, onClose])

  const clearAll = () => { router.push('/tires'); onClose?.() }
  const hasFilters = Object.values(searchParams).some(Boolean)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
            <X className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Brand</h4>
        <div className="grid grid-cols-2 gap-2 lg:block lg:space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-red-600 p-2 lg:p-0 rounded-lg hover:bg-red-50 lg:hover:bg-transparent transition-colors">
              <input
                type="radio"
                name="brand"
                checked={searchParams.brand === brand}
                onChange={() => updateFilter('brand', searchParams.brand === brand ? '' : brand)}
                className="accent-red-600 w-4 h-4 flex-shrink-0"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Tire Type</h4>
        <div className="grid grid-cols-2 gap-2 lg:block lg:space-y-2">
          {types.map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer hover:text-red-600 p-2 lg:p-0 rounded-lg hover:bg-red-50 lg:hover:bg-transparent transition-colors">
              <input
                type="radio"
                name="type"
                checked={searchParams.type === key}
                onChange={() => updateFilter('type', searchParams.type === key ? '' : key)}
                className="accent-red-600 w-4 h-4 flex-shrink-0"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
          />
          <span className="text-gray-400 flex-shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
        <button
          onClick={() => { updateFilter('minPrice', minPrice); }}
          className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2.5 rounded-lg transition-colors font-semibold min-h-[44px]"
        >
          Apply Price
        </button>
      </div>
    </div>
  )
}

export default function TireFilters({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeCount = Object.values(searchParams).filter(Boolean).length

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center justify-center gap-2 w-full border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 py-3 rounded-xl font-semibold transition-colors min-h-[48px]"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
          {activeCount > 0 && (
            <span className="bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setDrawerOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">Filter Tires</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterContent searchParams={searchParams} onClose={() => setDrawerOpen(false)} />
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-base min-h-[48px]"
            >
              See Results
            </button>
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <FilterContent searchParams={searchParams} />
      </div>
    </>
  )
}
