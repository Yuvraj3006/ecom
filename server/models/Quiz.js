const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  },
  questions: [{
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['single', 'multiple', 'text', 'rating', 'image'],
      required: true
    },
    options: [{
      value: String,
      label: String,
      description: String,
      image: String,
      weight: {
        type: Number,
        default: 1
      }
    }],
    required: {
      type: Boolean,
      default: true
    },
    order: Number
  }],
  logic: {
    rules: [{
      condition: {
        questionId: String,
        operator: {
          type: String,
          enum: ['equals', 'contains', 'not_equals', 'greater_than', 'less_than']
        },
        value: mongoose.Schema.Types.Mixed
      },
      action: {
        type: {
          type: String,
          enum: ['show_question', 'hide_question', 'set_value', 'jump_to']
        },
        target: String,
        value: mongoose.Schema.Types.Mixed
      }
    }]
  },
  results: {
    algorithm: {
      type: String,
      enum: ['weighted', 'rule-based', 'ml-model'],
      default: 'weighted'
    },
    categories: [{
      name: String,
      weight: Number,
      questions: [String]
    }],
    recommendations: {
      enabled: {
        type: Boolean,
        default: true
      },
      maxResults: {
        type: Number,
        default: 5
      },
      filters: [{
        field: String,
        operator: String,
        value: mongoose.Schema.Types.Mixed
      }]
    }
  },
  analytics: {
    totalCompletions: {
      type: Number,
      default: 0
    },
    averageCompletionTime: Number,
    completionRate: Number,
    popularAnswers: [{
      questionId: String,
      answer: String,
      count: Number
    }]
  },
  settings: {
    allowRetake: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    randomizeQuestions: {
      type: Boolean,
      default: false
    },
    timeLimit: Number, // in minutes
    requireLogin: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
})

// Indexes
quizSchema.index({ isActive: 1 })
quizSchema.index({ 'questions.id': 1 })

// Method to get question by ID
quizSchema.methods.getQuestion = function(questionId) {
  return this.questions.find(q => q.id === questionId)
}

// Method to add completion
quizSchema.methods.addCompletion = function(completionTime) {
  this.analytics.totalCompletions += 1
  
  if (completionTime) {
    const currentAvg = this.analytics.averageCompletionTime || 0
    const total = this.analytics.totalCompletions
    this.analytics.averageCompletionTime = ((currentAvg * (total - 1)) + completionTime) / total
  }
  
  return this.save()
}

// Method to update popular answers
quizSchema.methods.updatePopularAnswers = function(answers) {
  answers.forEach(answer => {
    const existing = this.analytics.popularAnswers.find(
      pa => pa.questionId === answer.questionId && pa.answer === answer.answer
    )
    
    if (existing) {
      existing.count += 1
    } else {
      this.analytics.popularAnswers.push({
        questionId: answer.questionId,
        answer: answer.answer,
        count: 1
      })
    }
  })
  
  // Sort by count and keep only top 10
  this.analytics.popularAnswers.sort((a, b) => b.count - a.count)
  this.analytics.popularAnswers = this.analytics.popularAnswers.slice(0, 10)
  
  return this.save()
}

module.exports = mongoose.model('Quiz', quizSchema)
