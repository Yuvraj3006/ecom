'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: "Alex Chen",
    role: "Tech Entrepreneur",
    image: "/images/testimonials/alex-chen.jpg",
    rating: 5,
    text: "The AR try-on feature is absolutely mind-blowing! I could see exactly how each frame looked on my face before buying. The AI recommendations were spot-on too.",
    frame: "Cyber Neon"
  },
  {
    name: "Maya Rodriguez",
    role: "UX Designer",
    image: "/images/testimonials/maya-rodriguez.jpg",
    rating: 5,
    text: "Finally, a brand that understands cyberpunk aesthetics! The frames are not just stylish but incredibly comfortable. The quiz helped me find my perfect match.",
    frame: "Quantum Edge"
  },
  {
    name: "Jordan Kim",
    role: "Gaming Streamer",
    image: "/images/testimonials/jordan-kim.jpg",
    rating: 5,
    text: "As a content creator, I need frames that look good on camera. CyberOptics delivered exactly what I was looking for - futuristic style with premium quality.",
    frame: "Holographic Dream"
  },
  {
    name: "Sam Taylor",
    role: "Software Engineer",
    image: "/images/testimonials/sam-taylor.jpg",
    rating: 5,
    text: "The prescription upload was seamless, and the home try-on kit made the whole process stress-free. I love my new frames!",
    frame: "Neon Circuit"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">What Our Customers Say</span>
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect frames with CyberOptics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              variant="glassmorphic"
              className="group hover:shadow-neon-glow transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-dark">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-gray">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-neutral-gray italic relative z-10">
                    {testimonial.text}
                  </p>
                </div>

                <div className="text-sm text-primary font-medium">
                  Wearing: {testimonial.frame}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-neutral-gray">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-neutral-gray">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-neutral-gray">Customer Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">Free</div>
            <div className="text-neutral-gray">Home Try-On</div>
          </div>
        </div>
      </div>
    </section>
  )
}
