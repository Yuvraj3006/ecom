'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { useQuiz } from '@/components/providers/QuizProvider'
import { QuizStep } from './QuizStep'
import { QuizResults } from './QuizResults'

const quizQuestions = [
  {
    id: 'face-shape',
    title: 'What\'s your face shape?',
    type: 'single',
    options: [
      { value: 'oval', label: 'Oval', description: 'Balanced proportions, slightly longer than wide' },
      { value: 'round', label: 'Round', description: 'Equal width and length, soft curves' },
      { value: 'square', label: 'Square', description: 'Strong jawline, equal width and length' },
      { value: 'heart', label: 'Heart', description: 'Wider forehead, narrower chin' },
      { value: 'diamond', label: 'Diamond', description: 'Narrow forehead and chin, wider cheekbones' }
    ]
  },
  {
    id: 'style-preference',
    title: 'What\'s your style vibe?',
    type: 'multiple',
    options: [
      { value: 'cyberpunk', label: 'Cyberpunk', description: 'Bold, futuristic, neon accents' },
      { value: 'minimalist', label: 'Minimalist', description: 'Clean, simple, understated' },
      { value: 'vintage', label: 'Vintage', description: 'Classic, retro-inspired designs' },
      { value: 'tech', label: 'Tech-Forward', description: 'High-tech, innovative features' },
      { value: 'artistic', label: 'Artistic', description: 'Unique, creative, expressive' }
    ]
  },
  {
    id: 'lifestyle',
    title: 'How do you spend your time?',
    type: 'multiple',
    options: [
      { value: 'work', label: 'Office Work', description: 'Professional, long hours at computer' },
      { value: 'creative', label: 'Creative Work', description: 'Design, art, content creation' },
      { value: 'active', label: 'Active Lifestyle', description: 'Sports, outdoor activities' },
      { value: 'social', label: 'Social Events', description: 'Parties, networking, events' },
      { value: 'gaming', label: 'Gaming/Streaming', description: 'Long hours in front of screens' }
    ]
  },
  {
    id: 'colors',
    title: 'What colors speak to you?',
    type: 'multiple',
    options: [
      { value: 'neon-pink', label: 'Neon Pink', description: 'Bold, energetic, attention-grabbing' },
      { value: 'electric-blue', label: 'Electric Blue', description: 'Cool, tech-inspired, calming' },
      { value: 'holographic', label: 'Holographic', description: 'Iridescent, color-shifting' },
      { value: 'metallic', label: 'Metallic', description: 'Silver, gold, chrome finishes' },
      { value: 'matte-black', label: 'Matte Black', description: 'Sleek, sophisticated, versatile' }
    ]
  },
  {
    id: 'budget',
    title: 'What\'s your budget range?',
    type: 'single',
    options: [
      { value: 'under-200', label: 'Under $200', description: 'Quality frames at great value' },
      { value: '200-400', label: '$200 - $400', description: 'Premium materials and design' },
      { value: '400-600', label: '$400 - $600', description: 'High-end frames with advanced features' },
      { value: '600-plus', label: '$600+', description: 'Luxury frames with cutting-edge technology' }
    ]
  }
]

export function QuizWizard() {
  const { state, nextStep, prevStep, answerQuestion, completeQuiz } = useQuiz()
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>([])

  const currentQuestion = quizQuestions[state.currentStep]
  const progress = ((state.currentStep + 1) / quizQuestions.length) * 100

  const handleAnswer = (value: string | string[]) => {
    setCurrentAnswer(value)
    answerQuestion({
      questionId: currentQuestion.id,
      answer: value,
      weight: 1
    })
  }

  const handleNext = () => {
    if (state.currentStep < quizQuestions.length - 1) {
      nextStep()
      setCurrentAnswer([])
    } else {
      // Generate results based on answers
      const result = generateResults()
      completeQuiz(result)
    }
  }

  const generateResults = () => {
    const answers = state.answers
    const faceShape = answers.find(a => a.questionId === 'face-shape')?.answer as string
    const style = answers.find(a => a.questionId === 'style-preference')?.answer as string[]
    const lifestyle = answers.find(a => a.questionId === 'lifestyle')?.answer as string[]
    const colors = answers.find(a => a.questionId === 'colors')?.answer as string[]
    const budget = answers.find(a => a.questionId === 'budget')?.answer as string

    // Generate recommendations based on answers
    const recommendations = generateRecommendations(faceShape, style, lifestyle, colors, budget)

    return {
      faceShape,
      style: style?.join(', ') || 'Mixed',
      lifestyle: lifestyle?.join(', ') || 'Mixed',
      colors: colors || [],
      recommendations,
      completedAt: new Date()
    }
  }

  const generateRecommendations = (faceShape: string, style: string[], lifestyle: string[], colors: string[], budget: string) => {
    const recommendations = []
    
    // Face shape recommendations
    if (faceShape === 'round') {
      recommendations.push('Cyber Neon', 'Quantum Edge')
    } else if (faceShape === 'square') {
      recommendations.push('Holographic Dream', 'Neon Circuit')
    } else if (faceShape === 'oval') {
      recommendations.push('Cyber Neon', 'Quantum Edge', 'Holographic Dream')
    } else {
      recommendations.push('Neon Circuit', 'Cyber Neon')
    }

    // Style-based recommendations
    if (style?.includes('cyberpunk')) {
      recommendations.push('Cyber Neon', 'Neon Circuit')
    }
    if (style?.includes('tech')) {
      recommendations.push('Quantum Edge', 'Holographic Dream')
    }

    return [...new Set(recommendations)]
  }

  if (state.isCompleted && state.result) {
    return <QuizResults result={state.result} />
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card variant="glassmorphic" className="mb-8">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              <span className="gradient-text">Frame Finder Quiz</span>
            </h1>
            <p className="text-lg text-neutral-gray">
              Answer a few questions to discover your perfect frames
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-neutral-dark">
                Step {state.currentStep + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-neutral-gray">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <QuizStep
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
          />

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={state.currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
              className="flex items-center"
            >
              {state.currentStep === quizQuestions.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Get Results
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
