'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Brain, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useQuiz } from '@/components/providers/QuizProvider'

const quizSteps = [
  {
    title: "Face Shape Analysis",
    description: "Discover your perfect frame shape based on your facial structure",
    icon: <Brain className="w-8 h-8" />
  },
  {
    title: "Style Preferences",
    description: "Tell us about your fashion sense and lifestyle",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    title: "Personalized Results",
    description: "Get AI-powered recommendations tailored just for you",
    icon: <CheckCircle className="w-8 h-8" />
  }
]

export function QuizSection() {
  const { state, startQuiz } = useQuiz()
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Find Your Perfect Frame</span>
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Our AI-powered Frame Finder quiz analyzes your face shape, style preferences, and lifestyle to recommend the perfect frames for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {quizSteps.map((step, index) => (
            <Card 
              key={index}
              variant="glassmorphic"
              className="group cursor-pointer hover:shadow-neon-glow transition-all duration-300"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    hoveredStep === index 
                      ? 'bg-gradient-primary text-white shadow-neon-glow' 
                      : 'bg-gradient-subtle text-primary'
                  }`}>
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="font-heading text-xl font-semibold mb-3 text-neutral-dark">
                  {step.title}
                </h3>
                
                <p className="text-neutral-gray">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-subtle rounded-2xl p-8 mb-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-heading text-2xl font-semibold mb-4 text-neutral-dark">
                Ready to Find Your Perfect Match?
              </h3>
              <p className="text-neutral-gray mb-6">
                Take our 2-minute quiz and discover frames that are perfectly suited to your face shape, style, and personality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quiz">
                  <Button 
                    size="lg" 
                    className="group"
                    onClick={startQuiz}
                  >
                    Start Frame Finder Quiz
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/try-on">
                  <Button variant="outline" size="lg">
                    Try AR Try-On Instead
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {state.result && (
            <div className="bg-white rounded-2xl p-6 shadow-soft-card border border-primary/20">
              <h4 className="font-heading text-lg font-semibold mb-2 text-neutral-dark">
                Your Last Quiz Results
              </h4>
              <p className="text-neutral-gray mb-4">
                Face Shape: {state.result.faceShape} • Style: {state.result.style}
              </p>
              <Link href="/quiz/results">
                <Button variant="outline">
                  View Recommendations
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
