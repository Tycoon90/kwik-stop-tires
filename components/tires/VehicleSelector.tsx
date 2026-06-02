'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const years = Array.from({ length: 30 }, (_, i) => 2025 - i)
const makes = ['Acura', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jeep', 'Kia', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo']
const modelsByMake: Record<string, string[]> = {
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Bronco', 'Ranger'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', '4Runner'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Ridgeline'],
  Chevrolet: ['Silverado', 'Equinox', 'Traverse', 'Colorado', 'Camaro', 'Malibu'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier', 'Titan'],
  Jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Gladiator', 'Compass'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', 'X7', '7 Series'],
  Mercedes: ['C-Class', 'E-Class', 'GLE', 'GLC', 'S-Class'],
}

export default function VehicleSelector() {
  const router = useRouter()
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')

  const models = make ? (modelsByMake[make] ?? ['Other']) : []

  const handleSearch = () => {
    if (!year || !make) return
    const params = new URLSearchParams({ year, make, ...(model && { model }) })
    router.push(`/tires?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
        >
          <option value="">Select Year</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
        <select
          value={make}
          onChange={(e) => { setMake(e.target.value); setModel('') }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
        >
          <option value="">Select Make</option>
          {makes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!make}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Select Model</option>
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <button
        onClick={handleSearch}
        disabled={!year || !make}
        className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        <Search className="w-4 h-4" />
        Find Tires
      </button>
    </div>
  )
}
