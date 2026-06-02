import VehicleSelector from '@/components/tires/VehicleSelector'

export const metadata = { title: 'Find Tires for My Vehicle' }

export default function FindTiresPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">Find My Tires</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3">Find Tires for Your Vehicle</h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">Select your vehicle or enter your tire size to find the perfect match.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-5 text-lg">Search by Vehicle</h2>
          <VehicleSelector />
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center"><span className="bg-gray-50 px-4 text-gray-500 text-sm">or search by tire size</span></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
          <h2 className="font-bold text-gray-900 mb-2 text-lg">Search by Tire Size</h2>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">Enter your tire size (e.g., 225/50R17) found on your tire sidewall or door jamb sticker.</p>
          <form action="/tires" method="get" className="flex flex-col sm:flex-row gap-3">
            <input
              name="search"
              placeholder="e.g. 225/50R17"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none font-mono text-base min-h-[48px]"
            />
            <button type="submit" className="w-full sm:w-auto bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors min-h-[48px]">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
