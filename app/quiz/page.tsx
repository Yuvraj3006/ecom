import { QuizWizard } from '@/components/quiz/QuizWizard'

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuizWizard />
      </div>
    </div>
  )
}
