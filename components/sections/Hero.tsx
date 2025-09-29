'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Sparkles, Eye, Zap } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Discover Your Perfect Frame",
      subtitle: "AI-powered recommendations meet futuristic design",
      description: "Experience the future of eyewear with our advanced frame finder quiz and AR try-on technology.",
      cta: "Start Frame Finder Quiz",
      href: "/quiz",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      title: "AR Try-On Experience",
      subtitle: "See yourself in any frame instantly",
      description: "Use your camera to virtually try on frames in real-time with our cutting-edge AR technology.",
      cta: "Try AR Try-On",
      href: "/try-on",
      icon: <Eye className="w-8 h-8" />
    },
    {
      title: "Cyberpunk Aesthetic",
      subtitle: "Bold, futuristic, and uniquely you",
      description: "Embrace the future with our collection of cyberpunk-inspired frames that push the boundaries of style.",
      cta: "Explore Collection",
      href: "/shop",
      icon: <Zap className="w-8 h-8" />
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-purple-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,128,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(176,38,255,0.1),transparent_50%)]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-hover rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-primary rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-white shadow-neon-glow">
              {currentSlideData.icon}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold">
              <span className="gradient-text">{currentSlideData.title}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-gray font-medium">
              {currentSlideData.subtitle}
            </p>
            
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              {currentSlideData.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={currentSlideData.href}>
              <Button size="lg" className="group">
                {currentSlideData.cta}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/shop">
              <Button variant="outline" size="lg">
                Browse All Frames
              </Button>
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary shadow-neon-glow' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
