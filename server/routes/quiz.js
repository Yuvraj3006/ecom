const express = require('express')
const Quiz = require('../models/Quiz')
const User = require('../models/User')
const Product = require('../models/Product')
const router = express.Router()

// Get active quiz
router.get('/active', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ isActive: true })
    if (!quiz) {
      return res.status(404).json({ message: 'No active quiz found' })
    }

    res.json({ quiz })
  } catch (error) {
    console.error('Get active quiz error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Submit quiz answers
router.post('/submit', async (req, res) => {
  try {
    const { answers, userId, completionTime } = req.body

    // Get active quiz
    const quiz = await Quiz.findOne({ isActive: true })
    if (!quiz) {
      return res.status(404).json({ message: 'No active quiz found' })
    }

    // Update quiz analytics
    await quiz.addCompletion(completionTime)
    await quiz.updatePopularAnswers(answers)

    // Generate recommendations
    const recommendations = await generateRecommendations(answers)

    // Save user's quiz results if logged in
    if (userId) {
      const user = await User.findById(userId)
      if (user) {
        user.quizResults.push({
          faceShape: answers.find(a => a.questionId === 'face-shape')?.answer,
          style: answers.find(a => a.questionId === 'style-preference')?.answer || [],
          lifestyle: answers.find(a => a.questionId === 'lifestyle')?.answer || [],
          colors: answers.find(a => a.questionId === 'colors')?.answer || [],
          recommendations: recommendations.map(r => r._id.toString())
        })
        await user.save()
      }
    }

    res.json({
      message: 'Quiz submitted successfully',
      recommendations
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user's quiz history
router.get('/history/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ quizResults: user.quizResults })
  } catch (error) {
    console.error('Get quiz history error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get quiz analytics (admin only)
router.get('/analytics', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ isActive: true })
    if (!quiz) {
      return res.status(404).json({ message: 'No active quiz found' })
    }

    const analytics = {
      totalCompletions: quiz.analytics.totalCompletions,
      averageCompletionTime: quiz.analytics.averageCompletionTime,
      completionRate: quiz.analytics.completionRate,
      popularAnswers: quiz.analytics.popularAnswers
    }

    res.json({ analytics })
  } catch (error) {
    console.error('Get quiz analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Generate recommendations based on quiz answers
async function generateRecommendations(answers) {
  try {
    const faceShape = answers.find(a => a.questionId === 'face-shape')?.answer
    const style = answers.find(a => a.questionId === 'style-preference')?.answer || []
    const lifestyle = answers.find(a => a.questionId === 'lifestyle')?.answer || []
    const colors = answers.find(a => a.questionId === 'colors')?.answer || []
    const budget = answers.find(a => a.questionId === 'budget')?.answer

    const filter = { isActive: true }

    // Face shape matching
    if (faceShape) {
      filter['attributes.faceShape'] = { $in: [faceShape] }
    }

    // Style matching
    if (style.length > 0) {
      filter['attributes.style'] = { $in: style }
    }

    // Color matching
    if (colors.length > 0) {
      filter['attributes.colors'] = { $in: colors }
    }

    // Budget matching
    if (budget) {
      switch (budget) {
        case 'under-200':
          filter.price = { $lt: 200 }
          break
        case '200-400':
          filter.price = { $gte: 200, $lt: 400 }
          break
        case '400-600':
          filter.price = { $gte: 400, $lt: 600 }
          break
        case '600-plus':
          filter.price = { $gte: 600 }
          break
      }
    }

    // Get recommendations with scoring
    const products = await Product.find(filter)
      .sort({ 'ratings.average': -1, salesCount: -1 })
      .limit(6)

    // Calculate match scores
    const scoredProducts = products.map(product => {
      let score = 0

      // Face shape match
      if (faceShape && product.attributes.faceShape?.includes(faceShape)) {
        score += 30
      }

      // Style match
      if (style.length > 0) {
        const styleMatches = product.attributes.style?.filter(s => style.includes(s)).length || 0
        score += (styleMatches / style.length) * 25
      }

      // Color match
      if (colors.length > 0) {
        const colorMatches = product.attributes.colors?.filter(c => colors.includes(c)).length || 0
        score += (colorMatches / colors.length) * 20
      }

      // Lifestyle match
      if (lifestyle.length > 0) {
        const lifestyleMatches = product.attributes.features?.filter(f => 
          lifestyle.some(l => f.toLowerCase().includes(l.toLowerCase()))
        ).length || 0
        score += (lifestyleMatches / lifestyle.length) * 15
      }

      // Rating bonus
      score += (product.ratings.average / 5) * 10

      return {
        ...product.toObject(),
        matchScore: Math.round(score)
      }
    })

    // Sort by match score
    scoredProducts.sort((a, b) => b.matchScore - a.matchScore)

    return scoredProducts.slice(0, 6)
  } catch (error) {
    console.error('Generate recommendations error:', error)
    return []
  }
}

module.exports = router
