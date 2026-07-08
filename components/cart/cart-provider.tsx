'use client'

import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import type { Product } from '@/lib/products'

export type CartLine = {
  key: string
  product: Product
  size: string
  color: string
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  isOpen: boolean
  count: number
  subtotal: number
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size: string, color: string, quantity?: number) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      const key = `${product.id}-${size}-${color}`
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key)
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, quantity: l.quantity + quantity } : l,
          )
        }
        return [...prev, { key, product, size, color, quantity }]
      })
      setIsOpen(true)
    },
    [],
  )

  const removeItem = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity } : l)),
    )
  }, [])

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  )
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      count,
      subtotal,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
    }),
    [lines, isOpen, count, subtotal, openCart, closeCart, addItem, removeItem, updateQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
