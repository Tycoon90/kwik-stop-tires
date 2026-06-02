'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Clock, Car, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { TIME_SLOTS, SERVICE_TYPE_LABELS } from '@/lib/utils'

const schema = z.object({
  serviceType: z.string().min(1, 'Select a service'),
  date: z.string().min(1, 'Select a date'),
  timeSlot: z.string().min(1, 'Select a time'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  vehicleYear: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  licensePlate: z.string().optional(),
  notes: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const today = new Date().toISOString().split('T')[0]

export default function AppointmentsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [confirmData, setConfirmData] = useState<FormData | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
      toast.error('Failed to book appointment. Please try again.')
      return
    }
    setConfirmData(data)
    setSubmitted(true)
    toast.success('Appointment booked! Check your email for confirmation.')
  }

  if (submitted && confirmData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600 mb-6">We'll see you at Kwik Stop Tires!</p>
          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-semibold">{SERVICE_TYPE_LABELS[confirmData.serviceType]}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-semibold">{confirmData.date}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-semibold">{confirmData.timeSlot}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold">{confirmData.firstName} {confirmData.lastName}</span></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">A confirmation email has been sent to {confirmData.email}</p>
          <a href="/" className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          Home / <span className="text-gray-900 font-medium">Book Appointment</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Schedule your tire service at Kwik Stop Tires</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Car className="w-5 h-5 text-red-600" />Service Type</h2>
            <select
              {...register('serviceType')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Select a service...</option>
              {Object.entries(SERVICE_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-red-600" />Date & Time</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  {...register('date')}
                  type="date"
                  min={today}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                <select
                  {...register('timeSlot')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select time...</option>
                  {TIME_SLOTS.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                </select>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot.message}</p>}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-red-600" />Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { field: 'firstName', label: 'First Name', type: 'text' },
                { field: 'lastName', label: 'Last Name', type: 'text' },
                { field: 'email', label: 'Email', type: 'email' },
                { field: 'phone', label: 'Phone', type: 'tel' },
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    {...register(field as any)}
                    type={type}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                  {errors[field as keyof FormData] && (
                    <p className="text-red-500 text-xs mt-1">{(errors[field as keyof FormData] as any)?.message}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Vehicle Information <span className="text-gray-400 font-normal text-sm">(optional)</span></h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { field: 'vehicleYear', label: 'Year', type: 'text', placeholder: '2020' },
                { field: 'vehicleMake', label: 'Make', type: 'text', placeholder: 'Toyota' },
                { field: 'vehicleModel', label: 'Model', type: 'text', placeholder: 'Camry' },
                { field: 'licensePlate', label: 'License Plate', type: 'text', placeholder: 'ABC-1234' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    {...register(field as any)}
                    type={type}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                {...register('notes')}
                rows={3}
                placeholder="Any special requests or information we should know..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 outline-none resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  )
}
