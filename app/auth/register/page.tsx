'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
      const err = await res.json()
      toast.error(err.error ?? 'Registration failed')
      return
    }
    await signIn('credentials', { email: data.email, password: data.password, redirect: false })
    toast.success('Account created! Welcome to Kwik Stop Tires.')
    router.push('/account')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4">K</div>
          <h1 className="text-2xl font-black text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-1">Join Kwik Stop Tires today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { field: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { field: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { field: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
            { field: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
          ].map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                {...register(field as any)}
                type={type}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
              {errors[field as keyof FormData] && (
                <p className="text-red-500 text-xs mt-1">{errors[field as keyof FormData]?.message}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-red-600 font-semibold hover:text-red-700">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
