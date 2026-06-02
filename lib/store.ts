import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  tireId: string
  brand: string
  model: string
  size: string
  image?: string
  price: number
  quantity: number
  includesInstall: boolean
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (tireId: string) => void
  updateQuantity: (tireId: string, quantity: number) => void
  toggleInstall: (tireId: string) => void
  clearCart: () => void
  itemCount: () => number
  subtotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.tireId === newItem.tireId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.tireId === newItem.tireId
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },
      removeItem: (tireId) =>
        set((state) => ({ items: state.items.filter((i) => i.tireId !== tireId) })),
      updateQuantity: (tireId, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.tireId === tireId ? { ...i, quantity } : i)),
        })),
      toggleInstall: (tireId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.tireId === tireId ? { ...i, includesInstall: !i.includesInstall } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'kwik-stop-cart' }
  )
)
