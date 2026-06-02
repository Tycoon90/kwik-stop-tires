'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(2, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      setSent(true)
      toast.success("Message sent! We'll get back to you soon.")
    } else {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">Contact</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Have a question? We're here to help. Reach out and we'll get back to you as soon as possible.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="font-bold text-gray-900 text-xl mb-6">Get in Touch</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">3901 NW 19th St<br />Fort Lauderdale, FL 33311</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:9169683262" className="text-red-600 hover:text-red-700 text-sm font-medium">(916) 968-3262</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:info@kwikstoptires.com" className="text-red-600 hover:text-red-700 text-sm font-medium">info@kwikstoptires.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Hours</p>
                    <div className="text-sm text-gray-600 space-y-0.5">
                      <div className="flex justify-between gap-8"><span>Mon–Fri</span><span className="font-medium">8:00 AM – 6:00 PM</span></div>
                      <div className="flex justify-between gap-8"><span>Saturday</span><span className="font-medium">8:00 AM – 5:00 PM</span></div>
                      <div className="flex justify-between gap-8"><span>Sunday</span><span className="text-red-500 font-medium">Closed</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.6!2d-80.1659!3d26.1259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM3hMV1Zk!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📨</div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600">We'll respond within 1 business day.</p>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-gray-900 text-xl mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {[
                    { field: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { field: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                    { field: 'subject', label: 'Subject', type: 'text', placeholder: 'Question about tire sizes' },
                  ].map(({ field, label, type, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <input
                        {...register(field as any)}
                        type={type}
                        placeholder={placeholder}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                      />
                      {errors[field as keyof FormData] && (
                        <p className="text-red-500 text-xs mt-1">{(errors[field as keyof FormData] as any)?.message}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
