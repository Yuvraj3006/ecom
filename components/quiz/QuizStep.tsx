'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizStepProps {
  question: {
    id: string
    title: string
    type: 'single' | 'multiple'
    options: Array<{
      value: string
      label: string
      description: string
    }>
  }
  currentAnswer: string | string[]
  onAnswer: (value: string | string[]) => void
}

export function QuizStep({ question, currentAnswer, onAnswer }: QuizStepProps) {
  const handleOptionClick = (value: string) => {
    if (question.type === 'single') {
      onAnswer(value)
    } else {
      const currentArray = Array.isArray(currentAnswer) ? currentAnswer : []
      const newAnswer = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      onAnswer(newAnswer)
    }
  }

  const isSelected = (value: string) => {
    if (question.type === 'single') {
      return currentAnswer === value
    } else {
      return Array.isArray(currentAnswer) && currentAnswer.includes(value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold mb-2 text-neutral-dark">
          {question.title}
        </h2>
        <p className="text-neutral-gray">
          {question.type === 'multiple' 
            ? 'Select all that apply' 
            : 'Choose the option that best describes you'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <Card
            key={option.value}
            variant="glassmorphic"
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-soft-card",
              isSelected(option.value) && "border-primary shadow-neon-glow bg-gradient-subtle"
            )}
            onClick={() => handleOptionClick(option.value)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                  isSelected(option.value)
                    ? "border-primary bg-primary"
                    : "border-gray-300"
                )}>
                  {isSelected(option.value) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-dark mb-2">
                    {option.label}
                  </h3>
                  <p className="text-sm text-neutral-gray">
                    {option.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {question.type === 'multiple' && (
        <div className="text-center">
          <p className="text-sm text-neutral-gray">
            Selected {Array.isArray(currentAnswer) ? currentAnswer.length : 0} option(s)
          </p>
        </div>
      )}
    </div>
  )
}
