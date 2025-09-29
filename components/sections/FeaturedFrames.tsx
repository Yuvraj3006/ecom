'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/providers/CartProvider'
import { formatPrice } from '@/lib/utils'

const featuredFrames = [
  {
    id: '1',
    name: 'Cyber Neon',
    price: 299,
    image: '/images/frames/cyber-neon.jpg',
    category: 'Cyberpunk',
    colors: ['Pink', 'Purple', 'Blue'],
    description: 'Bold geometric frames with neon accents'
  },
  {
    id: '2',
    name: 'Quantum Edge',
    price: 349,
    image: '/images/frames/quantum-edge.jpg',
    category: 'Futuristic',
    colors: ['Black', 'Silver', 'Gold'],
    description: 'Sharp angular design with metallic finish'
  },
  {
    id: '3',
    name: 'Holographic Dream',
    price: 399,
    image: '/images/frames/holographic-dream.jpg',
    category: 'Holographic',
    colors: ['Rainbow', 'Pink', 'Blue'],
    description: 'Iridescent frames that shift colors'
  },
  {
    id: '4',
    name: 'Neon Circuit',
    price: 279,
    image: '/images/frames/neon-circuit.jpg',
    category: 'Cyberpunk',
    colors: ['Green', 'Pink', 'Blue'],
    description: 'Circuit-pattern frames with LED-like effects'
  }
]

export function FeaturedFrames() {
  const [favorites, setFavorites] = useState<string[]>([])
  const { addToCart } = useCart()

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const handleAddToCart = (frame: typeof featuredFrames[0]) => {
    addToCart({
      id: frame.id,
      name: frame.name,
      price: frame.price,
      image: frame.image
    })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Featured Frames</span>
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Discover our most popular cyberpunk-inspired frames, designed for the future of fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredFrames.map((frame) => (
            <Card key={frame.id} variant="glassmorphic" className="group hover:shadow-neon-glow transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square relative overflow-hidden rounded-t-card">
                    <Image
                      src={frame.image}
                      alt={frame.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleFavorite(frame.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          favorites.includes(frame.id)
                            ? 'bg-primary text-white shadow-neon-glow'
                            : 'bg-white/80 text-neutral-dark hover:bg-primary hover:text-white'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      
                      <button className="p-2 rounded-full bg-white/80 text-neutral-dark hover:bg-primary hover:text-white transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-primary text-white text-xs font-medium rounded-full">
                        {frame.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-neutral-dark">
                          {frame.name}
                        </h3>
                        <p className="text-neutral-gray text-sm">
                          {frame.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">
                          {formatPrice(frame.price)}
                        </div>
                        <div className="flex space-x-1">
                          {frame.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{
                                backgroundColor: color === 'Pink' ? '#FF0080' :
                                               color === 'Purple' ? '#B026FF' :
                                               color === 'Blue' ? '#0066FF' :
                                               color === 'Black' ? '#111111' :
                                               color === 'Silver' ? '#C0C0C0' :
                                               color === 'Gold' ? '#FFD700' :
                                               color === 'Green' ? '#00FF00' :
                                               '#FF0080'
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1"
                          onClick={() => handleAddToCart(frame)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link href={`/product/${frame.id}`}>
                          <Button variant="outline" className="px-4">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" variant="outline">
              View All Frames
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
