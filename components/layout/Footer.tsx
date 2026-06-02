import Link from 'next/link'
import { MapPin, Phone, Clock, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-black">K</div>
              <div className="text-white font-bold">Kwik Stop Tires</div>
            </div>
            <p className="text-sm text-gray-400 mb-4">Fort Lauderdale's trusted tire shop. Quality tires, fast service, unbeatable prices.</p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/tires', label: 'Shop Tires' },
                { href: '/find-tires', label: 'Find My Tires' },
                { href: '/services', label: 'Services' },
                { href: '/appointments', label: 'Book Appointment' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {['Tire Installation', 'Tire Rotation', 'Flat Tire Repair', 'Wheel Balancing', 'TPMS Service', 'Nitrogen Fill'].map((s) => (
                <li key={s} className="text-gray-400">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>3901 NW 19th St<br />Fort Lauderdale, FL 33311</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href="tel:9169683262" className="hover:text-white">(916) 968-3262</a>
              </li>
              <li className="flex gap-2">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div>Mon–Fri: 8am – 6pm</div>
                  <div>Sat: 8am – 5pm</div>
                  <div>Sun: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Kwik Stop Tires. All rights reserved. | 3901 NW 19th St, Fort Lauderdale, FL 33311
      </div>
    </footer>
  )
}
