'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Sparkles, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="glassmorphic" className="text-center">
          <CardContent className="p-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white shadow-neon-glow">
                <Mail className="w-8 h-8" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              <span className="gradient-text">Stay in the Loop</span>
            </h2>
            
            <p className="text-lg text-neutral-gray mb-8 max-w-2xl mx-auto">
              Get exclusive access to new frame releases, special offers, and the latest in cyberpunk eyewear technology.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="group"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-sm text-neutral-gray mt-4">
                  No spam, just the good stuff. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
                  <span className="text-lg font-semibold text-green-600">
                    Successfully Subscribed!
                  </span>
                </div>
                <p className="text-neutral-gray">
                  Welcome to the CyberOptics family! Check your email for a special welcome offer.
                </p>
              </div>
            )}

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-neutral-dark mb-2">Exclusive Releases</h3>
                <p className="text-sm text-neutral-gray">Be the first to see new cyberpunk frames</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-gradient-hover rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-neutral-dark mb-2">Special Offers</h3>
                <p className="text-sm text-neutral-gray">Get member-only discounts and deals</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-neutral-dark mb-2">Tech Updates</h3>
                <p className="text-sm text-neutral-gray">Latest AR and AI technology news</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
