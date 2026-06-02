import Link from 'next/link'
import { Wrench, RotateCcw, Wind, Shield, Gauge, Zap, Trash2, Clock, DollarSign } from 'lucide-react'

export const metadata = { title: 'Services' }

const services = [
  {
    icon: Wrench,
    title: 'Tire Installation',
    description: 'Professional mounting and balancing of your new tires. Includes torque to spec and disposal of old tires.',
    time: '45–60 min',
    price: '$25/tire',
    included: ['Mount & balance', 'Torque to spec', 'Pressure check', 'Old tire disposal'],
  },
  {
    icon: RotateCcw,
    title: 'Tire Rotation',
    description: 'Extend tire life and ensure even wear with a professional rotation service.',
    time: '30 min',
    price: '$29.99',
    included: ['5-tire rotation available', 'Torque check', 'Tread depth inspection', 'Pressure adjustment'],
  },
  {
    icon: Shield,
    title: 'Flat Tire Repair',
    description: 'Fast, reliable flat tire repair. We\'ll assess the damage and repair or replace as needed.',
    time: '30–45 min',
    price: '$19.99',
    included: ['Puncture inspection', 'Patch or plug repair', 'Remount & balance', 'Pressure check'],
  },
  {
    icon: Gauge,
    title: 'Wheel Balancing',
    description: 'Eliminate vibrations and uneven wear with computerized wheel balancing.',
    time: '30 min',
    price: '$15/wheel',
    included: ['Computerized balance', 'Weight placement', 'Road force available', 'Before & after readout'],
  },
  {
    icon: Zap,
    title: 'TPMS Service',
    description: 'Tire Pressure Monitoring System sensor service, replacement, and reprogramming.',
    time: '30–60 min',
    price: '$29.99/sensor',
    included: ['Sensor testing', 'Sensor replacement', 'System reprogramming', 'Warning light reset'],
  },
  {
    icon: Wind,
    title: 'Nitrogen Fill',
    description: 'Upgrade from air to nitrogen for more stable pressure, better fuel economy, and longer tire life.',
    time: '15 min',
    price: '$5/tire',
    included: ['Full nitrogen fill', 'Pressure optimization', 'Nitrogen cap installation', 'First refill free'],
  },
  {
    icon: Trash2,
    title: 'Tire Disposal',
    description: 'Environmentally responsible disposal of your old tires. Drop off anytime.',
    time: 'Immediate',
    price: '$5/tire',
    included: ['Eco-friendly disposal', 'No appointment needed', 'All sizes accepted', 'Bulk discounts available'],
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">Services</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From installation to repair, we've got everything your tires need. Expert technicians, honest pricing, fast turnaround.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-4 h-4" />
                      {service.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      {service.price}
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {service.included.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href={`/appointments?service=${encodeURIComponent(service.title.toUpperCase().replace(/ /g, '_'))}`}
                    className="block w-full text-center bg-red-600 text-white py-2.5 rounded-lg font-bold hover:bg-red-700 transition-colors text-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
