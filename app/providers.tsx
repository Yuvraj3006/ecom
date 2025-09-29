'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import { QuizProvider } from '@/components/providers/QuizProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <CartProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
