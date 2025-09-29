'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/providers/CartProvider'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, updateQuantity, removeFromCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-modal transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-modal w-full max-w-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col bg-white/90 backdrop-blur-md border-l border-white/30 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-heading font-bold text-neutral-dark">
                Shopping Cart
              </h2>
              {state.itemCount > 0 && (
                <Badge variant="neon" className="ml-2">
                  {state.itemCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-neutral-gray hover:text-neutral-dark"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-subtle rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-neutral-dark mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-neutral-gray text-sm mb-6">
                    Discover our cyberpunk eyewear collection
                  </p>
                  <Button variant="neon" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/70 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg border border-primary/20">
                      <Image
                        src={item.image || '/images/placeholder-frame.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-neutral-dark truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-primary font-mono">
                        {formatPrice(item.price)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium text-neutral-dark min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-gray hover:text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {state.items.length > 0 && (
            <div className="border-t border-white/20 px-6 py-4 bg-white/60 backdrop-blur-md">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-heading font-semibold text-neutral-dark">
                    Subtotal
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(state.total)}
                  </span>
                </div>
                
                <p className="text-xs text-neutral-gray text-center">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href="/checkout" onClick={onClose}>
                    <Button variant="neon" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/cart" onClick={onClose}>
                      <Button variant="outline" className="w-full">
                        View Cart
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={onClose} className="w-full">
                      Continue Shopping
                    </Button>
                  </div>
                </div>

                {/* Quick Features */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-1">
                      <span className="text-xs text-white font-bold">🚚</span>
                    </div>
                    <p className="text-xs text-neutral-gray">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-1">
                      <span className="text-xs text-white font-bold">🔄</span>
                    </div>
                    <p className="text-xs text-neutral-gray">Easy Returns</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-1">
                      <span className="text-xs text-white font-bold">🏠</span>
                    </div>
                    <p className="text-xs text-neutral-gray">Try at Home</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}