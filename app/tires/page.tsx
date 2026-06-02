export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import TireCard from '@/components/tires/TireCard'
import TireFilters from '@/components/tires/TireFilters'
import { TIRE_TYPE_LABELS } from '@/lib/utils'

interface SearchParams {
  [key: string]: string | undefined
  brand?: string
  type?: string
  year?: string
  make?: string
  model?: string
  minPrice?: string
  maxPrice?: string
  sort?: string
  search?: string
}

export const metadata = { title: 'Shop Tires' }

async function TireGrid({ searchParams }: { searchParams: SearchParams }) {
  const where: any = {}
  if (searchParams.brand) where.brand = searchParams.brand
  if (searchParams.type) where.type = searchParams.type
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {}
    if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice)
    if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice)
  }
  if (searchParams.search) {
    where.OR = [
      { brand: { contains: searchParams.search, mode: 'insensitive' } },
      { model: { contains: searchParams.search, mode: 'insensitive' } },
      { size: { contains: searchParams.search, mode: 'insensitive' } },
    ]
  }

  const orderBy: any =
    searchParams.sort === 'price_asc' ? { price: 'asc' }
    : searchParams.sort === 'price_desc' ? { price: 'desc' }
    : searchParams.sort === 'rating' ? { rating: 'desc' }
    : { featured: 'desc' }

  const tires = await prisma.tire.findMany({ where, orderBy, take: 60 })

  if (tires.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No tires found</h3>
        <p className="text-gray-500">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">{tires.length} tires found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tires.map((tire) => <TireCard key={tire.id} tire={tire} />)}
      </div>
    </>
  )
}

export default function TiresPage({ searchParams }: { searchParams: SearchParams }) {
  const activeFilters = Object.entries(searchParams).filter(([, v]) => v).length

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          <span>Home</span> <span className="mx-2">/</span> <span className="text-gray-900 font-medium">Shop Tires</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TireFilters searchParams={searchParams} />
          </aside>

          {/* Main */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-gray-900">
                Shop Tires
                {searchParams.brand && <span className="text-red-600"> — {searchParams.brand}</span>}
                {searchParams.type && <span className="text-red-600"> — {TIRE_TYPE_LABELS[searchParams.type]}</span>}
              </h1>
              <div className="flex items-center gap-3">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
                  defaultValue={searchParams.sort ?? ''}
                >
                  <option value="">Best Match</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            <Suspense fallback={<TireSkeleton />}>
              <TireGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function TireSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl h-72 animate-pulse border border-gray-100" />
      ))}
    </div>
  )
}
