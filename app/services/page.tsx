import Link from 'next/link'
import { Wrench, RotateCcw, Wind, Shield, Gauge, Zap, Trash2, Clock, DollarSign } from 'lucide-react'

export const metadata = { title: 'Services' }

const services = [
  { icon: Wrench, title: 'Tire Installation', description: 'Professional mounting and balancing of your new tires. Includes torque to spec and disposal of old tires.', time: '45–60 min', price: '$25/tire', included: ['Mount & balance', 'Torque to spec', 'Pressure check', 'Old tire disposal'] },
  { icon: RotateCcw, title: 'Tire Rotation', description: 'Extend tire life and ensure even wear with a professional rotation service.', time: '30 min', price: '$29.99', included: ['5-tire rotation available', 'Torque check', 'Tread depth inspection', 'Pressure adjustment'] },
  { icon: Shield, title: 'Flat Tire Repair', description: 'Fast, reliable flat tire repair. We\'ll assess the damage and repair or replace as needed.', time: '30–45 min', price: '$19.99', included: ['Puncture inspection', 'Patch or plug repair', 'Remount & balance', 'Pressure check'] },
  { icon: Gauge, title: 'Wheel Balancing', description: 'Eliminate vibrations and uneven wear with computerized wheel balancing.', time: '30 min', price: '$15/wheel', included: ['Computerized balance', 'Weight placement', 'Road force available', 'Before & after readout'] },
  { icon: Zap, title: 'TPMS Service', description: 'Tire Pressure Monitoring System sensor service, replacement, and reprogramming.', time: '30–60 min', price: '$29.99/sensor', included: ['Sensor testing', 'Sensor replacement', 'System reprogramming', 'Warning light reset'] },
  { icon: Wind, title: 'Nitrogen Fill', description: 'Upgrade from air to nitrogen for more stable pressure and longer tire life.', time: '15 min', price: '$5/tire', included: ['Full nitrogen fill', 'Pressure optimization', 'Nitrogen cap install', 'First refill free'] },
  { icon: Trash2, title: 'Tire Disposal', description: 'Environmentally responsible disposal of your old tires. Drop off anytime.', time: 'Immediate', price: '$5/tire', included: ['Eco-friendly disposal', 'No appointment needed', 'All sizes accepted', 'Bulk discounts'] },
]

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">Services</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Expert technicians, honest pricing, fast turnaround. Everything your tires need, under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-7 h-7 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex gap-4 justify-center text-sm mb-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-4 h-4 flex-shrink-0" />{service.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />{service.price}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.included.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link
                      href="/appointments"
                      className="block w-full text-center bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors min-h-[48px] flex items-center justify-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
