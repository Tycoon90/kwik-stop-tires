export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Shield, Clock, DollarSign, Award, Star, ChevronRight, MapPin, Phone } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import TireCard from '@/components/tires/TireCard'
import VehicleSelector from '@/components/tires/VehicleSelector'

const brands = ['Michelin', 'Goodyear', 'Bridgestone', 'Pirelli', 'Firestone', 'Cooper', 'Falken', 'Nexen']

const testimonials = [
  { name: 'Maria S.', rating: 5, text: 'Fastest tire change I\'ve ever experienced. In and out in under an hour with 4 new Michelins. Great prices too!', date: '2 weeks ago' },
  { name: 'James T.', rating: 5, text: 'The staff was incredibly knowledgeable. They helped me find the perfect tires for my truck without upselling me on stuff I didn\'t need.', date: '1 month ago' },
  { name: 'Aisha R.', rating: 5, text: 'Had a flat on I-95, called Kwik Stop and they got me in same day. Honest pricing and friendly service. Will definitely be back!', date: '3 weeks ago' },
]

export default async function HomePage() {
  const featuredTires = await prisma.tire.findMany({
    where: { featured: true },
    take: 4,
    orderBy: { rating: 'desc' },
  }).catch(() => [])

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
                <Star className="w-4 h-4 fill-red-400" />
                Fort Lauderdale's #1 Rated Tire Shop
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6">
                Quality Tires.<br />
                <span className="text-red-500">Fast Service.</span><br />
                Unbeatable Prices.
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                Serving Fort Lauderdale since 2010. Same-day installation on most tires. Expert staff, competitive prices, and a warranty you can trust.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/find-tires" className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/30">
                  Find My Tires
                </Link>
                <Link href="/appointments" className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                  Book Appointment
                </Link>
              </div>
            </div>
            <div className="text-9xl text-center hidden lg:block select-none">🛞</div>
          </div>
        </div>
      </section>

      {/* Vehicle Selector Widget */}
      <section className="bg-white shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Find Tires for Your Vehicle</h2>
          <VehicleSelector />
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-lg">🎉 Special Offer: <span className="bg-white/20 px-3 py-0.5 rounded-full mx-2">KWIK20</span> — Save $20 on your first order!</p>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Top Tire Brands</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`/tires?brand=${brand}`}
                className="bg-white border border-gray-200 rounded-xl px-6 py-4 font-bold text-gray-700 hover:border-red-500 hover:text-red-600 transition-colors shadow-sm text-center min-w-[120px]"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tires */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900">Featured Tires</h2>
            <Link href="/tires" className="flex items-center gap-1 text-red-600 font-semibold hover:text-red-700 transition-colors">
              Shop All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTires.map((tire) => (
              <TireCard key={tire.id} tire={tire} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Why Choose Kwik Stop Tires?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: DollarSign, title: 'Competitive Prices', desc: 'We price-match competitors. Get the best deal guaranteed.' },
              { icon: Clock, title: 'Same-Day Installation', desc: 'Most tires in stock. Get in and out the same day.' },
              { icon: Award, title: 'Expert Staff', desc: 'Certified technicians with 10+ years of experience.' },
              { icon: Shield, title: 'Warranty Included', desc: 'Road hazard warranty on every tire we sell and install.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{t.name}</span>
                  <span className="text-gray-400 text-sm">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6">Visit Our Store</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">3901 NW 19th St</p>
                    <p className="text-gray-400">Fort Lauderdale, FL 33311</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <a href="tel:9169683262" className="hover:text-red-400 transition-colors">(916) 968-3262</a>
                </div>
                <div className="bg-white/10 rounded-xl p-4 mt-4">
                  <h3 className="font-bold mb-3">Hours of Operation</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Mon – Fri</span><span className="text-green-400 font-semibold">8:00 AM – 6:00 PM</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span className="text-green-400 font-semibold">8:00 AM – 5:00 PM</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span className="text-red-400 font-semibold">Closed</span></div>
                  </div>
                </div>
              </div>
              <Link href="/contact" className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                Get Directions
              </Link>
            </div>
            <div className="bg-gray-800 rounded-xl overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.6!2d-80.1659!3d26.1259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z3901+NW+19th+St%2C+Fort+Lauderdale%2C+FL+33311!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
