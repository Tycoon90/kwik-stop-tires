import { Shield, Award, Users, Heart } from 'lucide-react'

export const metadata = { title: 'About Us' }

const team = [
  { name: 'Carlos Martinez', role: 'Owner & Master Technician', emoji: '👨‍🔧', bio: '20+ years in the tire industry. Started Kwik Stop with a simple mission: honest service at fair prices.' },
  { name: 'Angela Thompson', role: 'Service Manager', emoji: '👩‍💼', bio: 'Ensures every customer leaves satisfied. 12 years managing tire shop operations across South Florida.' },
  { name: 'Mike Johnson', role: 'Lead Technician', emoji: '🧰', bio: 'ASE Certified with expertise in wheel alignment and TPMS systems. 8 years with Kwik Stop.' },
  { name: 'Rosa Diaz', role: 'Customer Relations', emoji: '😊', bio: 'Fluent in English and Spanish. The friendly face you see when you walk in the door.' },
]

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">About Us</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-6">Fort Lauderdale's Trusted<br />Tire Shop Since 2010</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            For over 14 years, Kwik Stop Tires has been the go-to destination for drivers in Fort Lauderdale and surrounding areas. We built our reputation on honesty, speed, and expertise.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-4">
                At Kwik Stop Tires, we believe every driver deserves quality tires at a price they can afford, installed by people they can trust.
              </p>
              <p className="text-gray-600 mb-6">
                We started with two bays and a promise: treat every customer like family. Today, we've grown but that promise hasn't changed. Whether you're driving a daily commuter or a weekend truck, we have the expertise and inventory to get you back on the road safely.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '14+', desc: 'Years in Business' },
                  { label: '50K+', desc: 'Tires Installed' },
                  { label: '4.9★', desc: 'Average Rating' },
                  { label: '100%', desc: 'Satisfaction Guaranteed' },
                ].map(({ label, desc }) => (
                  <div key={desc} className="bg-red-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-red-600">{label}</div>
                    <div className="text-sm text-gray-600 mt-1">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[Shield, Award, Users, Heart].map((Icon, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <Icon className="w-10 h-10 text-red-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 text-sm">
                    {['Licensed & Insured', 'ASE Certified', 'Local Family Business', 'Community Proud'][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-0.5">{member.name}</h3>
                <p className="text-red-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Certifications & Affiliations</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['ASE Certified', 'BBB Accredited', 'TIA Member', 'Florida Licensed', 'TPMS Certified'].map((cert) => (
              <div key={cert} className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 text-gray-700 font-semibold text-sm">
                ✓ {cert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
