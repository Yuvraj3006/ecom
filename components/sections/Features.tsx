'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { 
  Brain, 
  Eye, 
  Zap, 
  Shield, 
  Truck, 
  Headphones,
  Smartphone,
  Sparkles
} from 'lucide-react'

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Recommendations",
    description: "Advanced machine learning analyzes your face shape and preferences to suggest perfect frames.",
    color: "from-pink-500 to-purple-500"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "AR Virtual Try-On",
    description: "See how frames look on your face in real-time using cutting-edge augmented reality technology.",
    color: "from-purple-500 to-blue-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Prescription Upload",
    description: "Upload your prescription in seconds with our smart document recognition system.",
    color: "from-blue-500 to-green-500"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and privacy controls.",
    color: "from-green-500 to-yellow-500"
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Free Home Try-On",
    description: "Try up to 5 frames at home for free with our convenient try-on kit service.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Get help anytime with our dedicated customer support team and AI chatbot.",
    color: "from-orange-500 to-red-500"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Why Choose CyberOptics?</span>
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Experience the future of eyewear shopping with our innovative technology and customer-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              variant="glassmorphic"
              className="group hover:shadow-neon-glow transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-neon-glow transition-all duration-300`}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="font-heading text-xl font-semibold mb-3 text-neutral-dark">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-gray">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile App CTA */}
        <div className="mt-16 bg-gradient-subtle rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h3 className="font-heading text-2xl font-semibold mb-2 text-neutral-dark">
                Download Our Mobile App
              </h3>
              <p className="text-neutral-gray mb-4">
                Get the full CyberOptics experience on your smartphone with AR try-on and instant recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Smartphone className="w-5 h-5" />
                  <span>Download for iOS</span>
                </button>
                <button className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Smartphone className="w-5 h-5" />
                  <span>Download for Android</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-neon-glow">
                <Smartphone className="w-32 h-32 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-hover rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
