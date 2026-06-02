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
    if (!res.ok) { toast.error('Failed to book. Please try again.'); return }
    setConfirmData(data)
    setSubmitted(true)
    toast.success('Appointment booked!')
  }

  if (submitted && confirmData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600 mb-6">We'll see you at Kwik Stop Tires!</p>
          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm mb-6">
            <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-semibold">{SERVICE_TYPE_LABELS[confirmData.serviceType]}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-semibold">{confirmData.date}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-semibold">{confirmData.timeSlot}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold">{confirmData.firstName} {confirmData.lastName}</span></div>
          </div>
          <p className="text-sm text-gray-500 mb-6">Confirmation sent to {confirmData.email}</p>
          <a href="/" className="block w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors text-center">
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

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Schedule your tire service at Kwik Stop Tires</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Service */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-red-600" /> Service Type
            </h2>
            <select
              {...register('serviceType')}
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none text-base min-h-[48px]"
            >
              <option value="">Select a service...</option>
              {Object.entries(SERVICE_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" /> Date & Time
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  {...register('date')}
                  type="date"
                  min={today}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none text-base min-h-[48px]"
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const field = register('timeSlot')
                    return (
                      <label key={slot} className="cursor-pointer">
                        <input type="radio" value={slot} {...field} className="sr-only peer" />
                        <div className="border-2 border-gray-200 peer-checked:border-red-600 peer-checked:bg-red-50 peer-checked:text-red-700 rounded-lg py-2.5 text-center text-sm font-medium transition-colors hover:border-red-300 min-h-[44px] flex items-center justify-center">
                          {slot}
                        </div>
                      </label>
                    )
                  })}
                </div>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot.message}</p>}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" /> Contact Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { field: 'firstName', label: 'First Name', type: 'text' },
                  { field: 'lastName', label: 'Last Name', type: 'text' },
                ].map(({ field, label, type }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input {...register(field as any)} type={type} className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none text-base min-h-[48px]" />
                    {errors[field as keyof FormData] && <p className="text-red-500 text-xs mt-1">{(errors[field as keyof FormData] as any)?.message}</p>}
                  </div>
                ))}
              </div>
              {[
                { field: 'email', label: 'Email', type: 'email' },
                { field: 'phone', label: 'Phone', type: 'tel' },
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input {...register(field as any)} type={type} className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none text-base min-h-[48px]" />
                  {errors[field as keyof FormData] && <p className="text-red-500 text-xs mt-1">{(errors[field as keyof FormData] as any)?.message}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Vehicle <span className="text-gray-400 font-normal text-sm">(optional)</span></h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { field: 'vehicleYear', label: 'Year', placeholder: '2020' },
                  { field: 'vehicleMake', label: 'Make', placeholder: 'Toyota' },
                  { field: 'vehicleModel', label: 'Model', placeholder: 'Camry' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input {...register(field as any)} type="text" placeholder={placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none text-base min-h-[48px]" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                <input {...register('licensePlate')} type="text" placeholder="ABC-1234" className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none text-base min-h-[48px]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea {...register('notes')} rows={3} placeholder="Any special requests..." className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-red-500 outline-none resize-none text-base" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-60 min-h-[56px]"
          >
            {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  )
}
