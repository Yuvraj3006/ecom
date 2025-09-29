'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { CartButton } from '@/components/cart/CartButton'
import { 
  Menu, 
  X, 
  Search, 
  User, 
  ShoppingBag,
  Sparkles
} from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/30 shadow-soft-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold gradient-text">
              CyberOptics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/shop" 
              className="text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
            >
              Shop
            </Link>
            <Link 
              href="/quiz" 
              className="text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
            >
              Frame Finder
            </Link>
            <Link 
              href="/try-on" 
              className="text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
            >
              AR Try-On
            </Link>
            <Link 
              href="/about" 
              className="text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
            >
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <CartButton />
            {session ? (
              <div className="flex items-center space-x-2">
                <Link href="/account">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartButton />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-soft-card">
              <Link 
                href="/shop" 
                className="block px-3 py-2 text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/quiz" 
                className="block px-3 py-2 text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Frame Finder
              </Link>
              <Link 
                href="/try-on" 
                className="block px-3 py-2 text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                AR Try-On
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="border-t border-gray-200 pt-2 mt-2">
                {session ? (
                  <div className="space-y-2">
                    <Link 
                      href="/account"
                      className="block px-3 py-2 text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        signIn()
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-neutral-dark hover:text-primary transition-colors duration-300 font-medium"
                    >
                      Sign In
                    </button>
                    <Button 
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
