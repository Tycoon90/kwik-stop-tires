import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: "Kwik Stop Tires | Fort Lauderdale's #1 Tire Shop", template: '%s | Kwik Stop Tires' },
  description: 'Quality tires at competitive prices. Same-day installation available. Serving Fort Lauderdale, FL. Shop Michelin, Goodyear, Bridgestone, and more.',
  keywords: ['tires', 'tire shop', 'Fort Lauderdale', 'tire installation', 'Kwik Stop Tires'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}
