import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))
}

export const INSTALLATION_FEE = 25
export const TAX_RATE = 0.07

export const TIRE_TYPE_LABELS: Record<string, string> = {
  ALL_SEASON: 'All-Season',
  SUMMER: 'Summer',
  WINTER: 'Winter',
  PERFORMANCE: 'Performance',
  TRUCK_SUV: 'Truck/SUV',
  ALL_TERRAIN: 'All-Terrain',
}

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  TIRE_INSTALLATION: 'Tire Installation',
  TIRE_ROTATION: 'Tire Rotation',
  FLAT_REPAIR: 'Flat Tire Repair',
  WHEEL_BALANCING: 'Wheel Balancing',
  TPMS_SERVICE: 'TPMS Service',
  NITROGEN_FILL: 'Nitrogen Fill',
  TIRE_DISPOSAL: 'Tire Disposal',
}

export const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM',
]
