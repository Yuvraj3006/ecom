'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/providers/CartProvider'
import { formatPrice } from '@/lib/utils'

interface Product {
  _id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  images: Array<{ url: string; alt: string; isPrimary: boolean }>
  attributes: {
    colors: string[]
    style: string[]
  }
  ratings: {
    average: number
    count: number
  }
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || ''
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} variant="glassmorphic" className="animate-pulse">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-200 rounded-t-card" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-6 bg-gray-200 rounded w-1/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-neutral-gray">
          Showing {products.length} products
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-gray">Sort by:</span>
          <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm">
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} variant="glassmorphic" className="group hover:shadow-neon-glow transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-square relative overflow-hidden rounded-t-card">
                  <Image
                    src={product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="px-2 py-1 bg-gradient-primary text-white text-xs font-medium rounded-full">
                        New
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="px-2 py-1 bg-gradient-hover text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleFavorite(product._id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        favorites.includes(product._id)
                          ? 'bg-primary text-white shadow-neon-glow'
                          : 'bg-white/80 text-neutral-dark hover:bg-primary hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    
                    <Link href={`/product/${product.slug}`}>
                      <button className="p-2 rounded-full bg-white/80 text-neutral-dark hover:bg-primary hover:text-white transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-dark mb-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.ratings.average)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-neutral-gray">
                          ({product.ratings.count})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        {product.comparePrice && (
                          <span className="text-lg text-neutral-gray line-through">
                            {formatPrice(product.comparePrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-1">
                        {product.attributes.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{
                              backgroundColor: color === 'neon-pink' ? '#FF0080' :
                                             color === 'electric-blue' ? '#0066FF' :
                                             color === 'holographic' ? '#FF0080' :
                                             color === 'metallic' ? '#C0C0C0' :
                                             color === 'matte-black' ? '#111111' :
                                             '#FF0080'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Link href={`/product/${product.slug}`}>
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

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-gray text-lg">No products found</p>
          <p className="text-neutral-gray">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
