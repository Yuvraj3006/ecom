const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['hero', 'promotional', 'seasonal', 'product', 'quiz', 'newsletter'],
    required: true
  },
  position: {
    type: String,
    enum: ['top', 'middle', 'bottom', 'sidebar', 'floating'],
    required: true
  },
  content: {
    image: {
      url: String,
      alt: String,
      mobileUrl: String
    },
    video: {
      url: String,
      thumbnail: String,
      autoplay: {
        type: Boolean,
        default: false
      }
    },
    text: {
      heading: String,
      subheading: String,
      body: String,
      cta: {
        text: String,
        url: String,
        style: {
          type: String,
          enum: ['primary', 'secondary', 'outline', 'ghost'],
          default: 'primary'
        }
      }
    },
    colors: {
      background: String,
      text: String,
      accent: String
    }
  },
  targeting: {
    audience: {
      type: String,
      enum: ['all', 'new', 'returning', 'quiz-takers', 'purchasers'],
      default: 'all'
    },
    location: {
      type: String,
      enum: ['all', 'homepage', 'shop', 'quiz', 'product', 'cart'],
      default: 'all'
    },
    device: {
      type: String,
      enum: ['all', 'desktop', 'mobile', 'tablet'],
      default: 'all'
    }
  },
  scheduling: {
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  settings: {
    isActive: {
      type: Boolean,
      default: true
    },
    priority: {
      type: Number,
      default: 0
    },
    clickable: {
      type: Boolean,
      default: true
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      enum: ['none', 'fade', 'slide', 'bounce', 'pulse'],
      default: 'fade'
    }
  },
  analytics: {
    impressions: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    },
    ctr: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// Indexes
bannerSchema.index({ isActive: 1, position: 1 })
bannerSchema.index({ 'scheduling.startDate': 1, 'scheduling.endDate': 1 })
bannerSchema.index({ 'targeting.audience': 1, 'targeting.location': 1 })

// Virtual for click-through rate
bannerSchema.virtual('clickThroughRate').get(function() {
  if (this.analytics.impressions === 0) return 0
  return (this.analytics.clicks / this.analytics.impressions) * 100
})

// Virtual for conversion rate
bannerSchema.virtual('conversionRate').get(function() {
  if (this.analytics.clicks === 0) return 0
  return (this.analytics.conversions / this.analytics.clicks) * 100
})

// Method to record impression
bannerSchema.methods.recordImpression = function() {
  this.analytics.impressions += 1
  this.analytics.ctr = this.clickThroughRate
  return this.save()
}

// Method to record click
bannerSchema.methods.recordClick = function() {
  this.analytics.clicks += 1
  this.analytics.ctr = this.clickThroughRate
  return this.save()
}

// Method to record conversion
bannerSchema.methods.recordConversion = function() {
  this.analytics.conversions += 1
  this.analytics.conversionRate = this.conversionRate
  return this.save()
}

// Method to check if banner is currently active
bannerSchema.methods.isCurrentlyActive = function() {
  if (!this.settings.isActive) return false
  
  const now = new Date()
  const startDate = this.scheduling.startDate
  const endDate = this.scheduling.endDate
  
  if (startDate && now < startDate) return false
  if (endDate && now > endDate) return false
  
  return true
}

// Static method to get active banners
bannerSchema.statics.getActiveBanners = function(filters = {}) {
  const now = new Date()
  
  return this.find({
    'settings.isActive': true,
    'scheduling.startDate': { $lte: now },
    $or: [
      { 'scheduling.endDate': { $gte: now } },
      { 'scheduling.endDate': { $exists: false } }
    ],
    ...filters
  }).sort({ 'settings.priority': -1, createdAt: -1 })
}

module.exports = mongoose.model('Banner', bannerSchema)
