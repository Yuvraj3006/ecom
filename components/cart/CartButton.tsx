'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/providers/CartProvider'
import { CartDrawer } from './CartDrawer'

export function CartButton() {
  const { state } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-neutral-dark hover:text-primary transition-colors duration-300"
      >
        <ShoppingBag className="w-5 h-5" />
        {state.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {state.itemCount}
          </span>
        )}
      </button>
      
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
