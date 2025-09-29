const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: ['frame', 'lens', 'accessory', 'sunglasses']
  },
  subcategory: {
    type: String,
    required: true,
    enum: ['eyeglasses', 'sunglasses', 'prescription', 'blue-light', 'reading', 'progressive', 'bifocal', 'single-vision', 'case', 'cleaning-kit', 'straps']
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  attributes: {
    faceShape: [{
      type: String,
      enum: ['oval', 'round', 'square', 'heart', 'diamond']
    }],
    style: [{
      type: String,
      enum: ['cyberpunk', 'minimalist', 'vintage', 'tech', 'artistic', 'futuristic', 'bold', 'classic']
    }],
    colors: [{
      type: String,
      enum: ['neon-pink', 'electric-blue', 'holographic', 'metallic', 'matte-black', 'chrome', 'rose-gold', 'gunmetal']
    }],
    materials: [{
      type: String,
      enum: ['acetate', 'titanium', 'stainless-steel', 'carbon-fiber', 'wood', 'horn', 'plastic']
    }],
    features: [{
      type: String,
      enum: ['blue-light-filtering', 'anti-reflective', 'photochromic', 'polarized', 'scratch-resistant', 'uv-protection', 'transition']
    }],
    frameType: {
      type: String,
      enum: ['full-rim', 'semi-rimless', 'rimless', 'browline', 'cat-eye', 'round', 'square', 'oval']
    },
    bridgeWidth: {
      type: Number,
      min: 0
    },
    lensWidth: {
      type: Number,
      min: 0
    },
    templeLength: {
      type: Number,
      min: 0
    },
    weight: {
      type: Number,
      min: 0
    }
  },
  inventory: {
    total: {
      type: Number,
      required: true,
      min: 0
    },
    available: {
      type: Number,
      required: true,
      min: 0
    },
    reserved: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  salesCount: {
    type: Number,
    default: 0,
    min: 0
  },
  viewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  crossSellProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  upsellProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  tags: [String],
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, {
  timestamps: true
})

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' })
productSchema.index({ category: 1, subcategory: 1 })
productSchema.index({ price: 1 })
productSchema.index({ isActive: 1, isFeatured: 1 })
productSchema.index({ 'attributes.faceShape': 1 })
productSchema.index({ 'attributes.style': 1 })
productSchema.index({ 'attributes.colors': 1 })
productSchema.index({ slug: 1 })

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100)
  }
  return 0
})

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.inventory.available === 0) {
    return 'out-of-stock'
  } else if (this.inventory.available <= 5) {
    return 'low-stock'
  }
  return 'in-stock'
})

// Pre-save middleware to ensure available doesn't exceed total
productSchema.pre('save', function(next) {
  if (this.inventory.available > this.inventory.total) {
    this.inventory.available = this.inventory.total
  }
  if (this.inventory.reserved > this.inventory.total) {
    this.inventory.reserved = this.inventory.total
  }
  next()
})

// Method to check if product is in stock
productSchema.methods.isInStock = function() {
  return this.inventory.available > 0
}

// Method to reserve inventory
productSchema.methods.reserveInventory = function(quantity) {
  if (this.inventory.available >= quantity) {
    this.inventory.available -= quantity
    this.inventory.reserved += quantity
    return true
  }
  return false
}

// Method to release reserved inventory
productSchema.methods.releaseInventory = function(quantity) {
  if (this.inventory.reserved >= quantity) {
    this.inventory.reserved -= quantity
    this.inventory.available += quantity
    return true
  }
  return false
}

// Method to confirm sale (move from reserved to sold)
productSchema.methods.confirmSale = function(quantity) {
  if (this.inventory.reserved >= quantity) {
    this.inventory.reserved -= quantity
    this.salesCount += quantity
    return true
  }
  return false
}

module.exports = mongoose.model('Product', productSchema)


