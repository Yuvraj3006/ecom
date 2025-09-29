'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

export interface QuizAnswer {
  questionId: string
  answer: string | string[]
  weight: number
}

export interface QuizResult {
  faceShape: string
  style: string
  lifestyle: string
  colors: string[]
  recommendations: string[]
  completedAt: Date
}

interface QuizState {
  currentStep: number
  answers: QuizAnswer[]
  isCompleted: boolean
  result: QuizResult | null
  isStarted: boolean
}

type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'ANSWER_QUESTION'; payload: QuizAnswer }
  | { type: 'COMPLETE_QUIZ'; payload: QuizResult }
  | { type: 'RESET_QUIZ' }
  | { type: 'LOAD_QUIZ'; payload: Partial<QuizState> }

const QuizContext = createContext<{
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
  startQuiz: () => void
  nextStep: () => void
  prevStep: () => void
  answerQuestion: (answer: QuizAnswer) => void
  completeQuiz: (result: QuizResult) => void
  resetQuiz: () => void
} | undefined>(undefined)

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...state,
        isStarted: true,
        currentStep: 0,
        answers: [],
        isCompleted: false,
        result: null
      }
    
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 4) // Assuming 5 steps (0-4)
      }
    
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      }
    
    case 'ANSWER_QUESTION': {
      const existingAnswerIndex = state.answers.findIndex(
        answer => answer.questionId === action.payload.questionId
      )
      
      let updatedAnswers: QuizAnswer[]
      if (existingAnswerIndex >= 0) {
        updatedAnswers = state.answers.map((answer, index) =>
          index === existingAnswerIndex ? action.payload : answer
        )
      } else {
        updatedAnswers = [...state.answers, action.payload]
      }
      
      return {
        ...state,
        answers: updatedAnswers
      }
    }
    
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isCompleted: true,
        result: action.payload,
        currentStep: 4
      }
    
    case 'RESET_QUIZ':
      return {
        currentStep: 0,
        answers: [],
        isCompleted: false,
        result: null,
        isStarted: false
      }
    
    case 'LOAD_QUIZ':
      return {
        ...state,
        ...action.payload
      }
    
    default:
      return state
  }
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, {
    currentStep: 0,
    answers: [],
    isCompleted: false,
    result: null,
    isStarted: false
  })

  useEffect(() => {
    const savedQuiz = localStorage.getItem('quiz')
    if (savedQuiz) {
      try {
        const quizData = JSON.parse(savedQuiz)
        dispatch({ type: 'LOAD_QUIZ', payload: quizData })
      } catch (error) {
        console.error('Error loading quiz from localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('quiz', JSON.stringify(state))
  }, [state])

  const startQuiz = () => {
    dispatch({ type: 'START_QUIZ' })
  }

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' })
  }

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' })
  }

  const answerQuestion = (answer: QuizAnswer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer })
  }

  const completeQuiz = (result: QuizResult) => {
    dispatch({ type: 'COMPLETE_QUIZ', payload: result })
  }

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' })
  }

  return (
    <QuizContext.Provider value={{
      state,
      dispatch,
      startQuiz,
      nextStep,
      prevStep,
      answerQuestion,
      completeQuiz,
      resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
