'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Sparkles, Eye, ShoppingCart, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/components/providers/CartProvider'
import { formatPrice } from '@/lib/utils'

interface QuizResultsProps {
  result: {
    faceShape: string
    style: string
    lifestyle: string
    colors: string[]
    recommendations: string[]
    completedAt: Date
  }
}

const recommendedFrames = [
  {
    id: '1',
    name: 'Cyber Neon',
    price: 299,
    image: '/images/frames/cyber-neon.jpg',
    description: 'Perfect for your face shape and style preferences',
    match: 95
  },
  {
    id: '2',
    name: 'Quantum Edge',
    price: 349,
    image: '/images/frames/quantum-edge.jpg',
    description: 'Great match for your lifestyle and color preferences',
    match: 88
  },
  {
    id: '3',
    name: 'Holographic Dream',
    price: 399,
    image: '/images/frames/holographic-dream.jpg',
    description: 'Excellent choice based on your quiz answers',
    match: 92
  }
]

export function QuizResults({ result }: QuizResultsProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (frame: typeof recommendedFrames[0]) => {
    addToCart({
      id: frame.id,
      name: frame.name,
      price: frame.price,
      image: frame.image
    })
  }

  return (
    <div className="space-y-8">
      <Card variant="glassmorphic" className="text-center">
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-white shadow-neon-glow">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Your Perfect Match!</span>
          </h1>
          
          <p className="text-lg text-neutral-gray mb-6">
            Based on your answers, we've found the ideal frames for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">{result.faceShape}</div>
              <div className="text-sm text-neutral-gray">Face Shape</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">{result.style}</div>
              <div className="text-sm text-neutral-gray">Style</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">{result.lifestyle}</div>
              <div className="text-sm text-neutral-gray">Lifestyle</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/try-on">
              <Button size="lg" className="group">
                <Eye className="w-5 h-5 mr-2" />
                Try AR Try-On
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg">
                Browse All Frames
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-heading font-bold mb-6 text-center">
          <span className="gradient-text">Recommended for You</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedFrames.map((frame) => (
            <Card key={frame.id} variant="glassmorphic" className="group hover:shadow-neon-glow transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square relative overflow-hidden rounded-t-card">
                    <img
                      src={frame.image}
                      alt={frame.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {frame.match}% Match
                      </div>
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
      </div>

      <Card variant="glassmorphic">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-heading text-xl font-semibold mb-4 text-neutral-dark">
              Share Your Results
            </h3>
            <p className="text-neutral-gray mb-6">
              Let your friends know about your perfect frame match!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="group">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              <Link href="/quiz">
                <Button variant="outline">
                  Retake Quiz
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
