const mongoose = require('mongoose')

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  colors: {
    primary: {
      type: String,
      default: '#FF0080'
    },
    secondary: {
      type: String,
      default: '#FFFFFF'
    },
    accent: {
      type: String,
      default: '#B026FF'
    },
    neutralDark: {
      type: String,
      default: '#111111'
    },
    neutralLight: {
      type: String,
      default: '#F8F9FA'
    },
    neutralGray: {
      type: String,
      default: '#6B7280'
    },
    gradientPrimary: {
      type: String,
      default: 'linear-gradient(135deg, #FF0080 0%, #B026FF 100%)'
    },
    gradientHover: {
      type: String,
      default: 'linear-gradient(135deg, #FF4DB8 0%, #C158FF 100%)'
    },
    gradientSubtle: {
      type: String,
      default: 'linear-gradient(135deg, rgba(255,0,128,0.1) 0%, rgba(176,38,255,0.1) 100%)'
    }
  },
  typography: {
    heading: {
      fontFamily: {
        type: String,
        default: 'Orbitron, sans-serif'
      },
      sizes: {
        xs: { type: String, default: '0.75rem' },
        sm: { type: String, default: '0.875rem' },
        base: { type: String, default: '1rem' },
        lg: { type: String, default: '1.125rem' },
        xl: { type: String, default: '1.25rem' },
        '2xl': { type: String, default: '1.5rem' },
        '3xl': { type: String, default: '1.875rem' },
        '4xl': { type: String, default: '2.25rem' },
        '5xl': { type: String, default: '3rem' },
        '6xl': { type: String, default: '3.75rem' }
      }
    },
    body: {
      fontFamily: {
        type: String,
        default: 'Inter, sans-serif'
      }
    }
  },
  shadows: {
    neonGlow: {
      type: String,
      default: '0 0 12px rgba(255,0,128,0.5)'
    },
    neonGlowStrong: {
      type: String,
      default: '0 0 20px rgba(255,0,128,0.8)'
    },
    softCard: {
      type: String,
      default: '0 4px 12px rgba(0,0,0,0.08)'
    },
    softCardHover: {
      type: String,
      default: '0 8px 24px rgba(0,0,0,0.12)'
    },
    glassmorphic: {
      type: String,
      default: '0 8px 32px rgba(255,255,255,0.1)'
    }
  },
  radius: {
    card: {
      type: String,
      default: '1.25rem'
    },
    button: {
      type: String,
      default: '9999px'
    },
    input: {
      type: String,
      default: '0.75rem'
    },
    modal: {
      type: String,
      default: '1.5rem'
    }
  },
  spacing: {
    xs: { type: String, default: '0.25rem' },
    sm: { type: String, default: '0.5rem' },
    md: { type: String, default: '1rem' },
    lg: { type: String, default: '1.5rem' },
    xl: { type: String, default: '2rem' },
    '2xl': { type: String, default: '3rem' },
    '3xl': { type: String, default: '4rem' }
  },
  animations: {
    fadeIn: {
      type: String,
      default: 'fadeIn 0.3s ease-in-out'
    },
    slideUp: {
      type: String,
      default: 'slideUp 0.4s ease-out'
    },
    glow: {
      type: String,
      default: 'glow 2s ease-in-out infinite alternate'
    },
    pulse: {
      type: String,
      default: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }
  },
  customCSS: String,
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
themeSchema.index({ isActive: 1 })
themeSchema.index({ name: 1 })

// Method to activate theme
themeSchema.methods.activate = function() {
  // Deactivate all other themes
  return this.constructor.updateMany(
    { _id: { $ne: this._id } },
    { isActive: false }
  ).then(() => {
    this.isActive = true
    return this.save()
  })
}

// Static method to get active theme
themeSchema.statics.getActiveTheme = function() {
  return this.findOne({ isActive: true })
}

// Method to generate CSS variables
themeSchema.methods.generateCSSVariables = function() {
  const variables = []
  
  // Colors
  Object.entries(this.colors).forEach(([key, value]) => {
    variables.push(`--color-${key}: ${value};`)
  })
  
  // Typography
  variables.push(`--font-heading: ${this.typography.heading.fontFamily};`)
  variables.push(`--font-body: ${this.typography.body.fontFamily};`)
  
  // Shadows
  Object.entries(this.shadows).forEach(([key, value]) => {
    variables.push(`--shadow-${key}: ${value};`)
  })
  
  // Radius
  Object.entries(this.radius).forEach(([key, value]) => {
    variables.push(`--radius-${key}: ${value};`)
  })
  
  // Spacing
  Object.entries(this.spacing).forEach(([key, value]) => {
    variables.push(`--spacing-${key}: ${value};`)
  })
  
  return variables.join('\n')
}

module.exports = mongoose.model('Theme', themeSchema)
