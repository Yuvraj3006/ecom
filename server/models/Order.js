const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    variant: {
      sku: String,
      name: String,
      attributes: {
        color: String,
        size: String,
        material: String,
        finish: String
      }
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    prescription: {
      eye: {
        type: String,
        enum: ['left', 'right'],
        required: true
      },
      sphere: Number,
      cylinder: Number,
      axis: Number,
      pupillaryDistance: Number,
      doctorName: String,
      doctorPhone: String
    }
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      default: 0
    },
    shipping: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  shipping: {
    address: {
      firstName: String,
      lastName: String,
      company: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String
    },
    method: {
      type: String,
      enum: ['standard', 'express', 'overnight'],
      default: 'standard'
    },
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    actualDelivery: Date
  },
  billing: {
    address: {
      firstName: String,
      lastName: String,
      company: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    sameAsShipping: {
      type: Boolean,
      default: true
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['stripe', 'paypal', 'apple_pay', 'google_pay'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentIntentId: String,
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  notes: {
    customer: String,
    internal: String
  },
  timeline: [{
    status: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  refund: {
    reason: String,
    amount: Number,
    processedAt: Date,
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  tryOnKit: {
    requested: {
      type: Boolean,
      default: false
    },
    sentAt: Date,
    returnedAt: Date,
    status: {
      type: String,
      enum: ['pending', 'sent', 'returned', 'overdue'],
      default: 'pending'
    }
  }
}, {
  timestamps: true
})

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    this.orderNumber = `CO-${timestamp}-${random}`.toUpperCase()
  }
  next()
})

// Indexes
orderSchema.index({ orderNumber: 1 })
orderSchema.index({ user: 1, createdAt: -1 })
orderSchema.index({ status: 1 })
orderSchema.index({ 'payment.transactionId': 1 })

// Virtual for order total
orderSchema.virtual('orderTotal').get(function() {
  return this.pricing.total
})

// Method to update status
orderSchema.methods.updateStatus = function(status, message, userId) {
  this.status = status
  this.timeline.push({
    status,
    message,
    user: userId
  })
  return this.save()
}

// Method to add timeline entry
orderSchema.methods.addTimelineEntry = function(status, message, userId) {
  this.timeline.push({
    status,
    message,
    user: userId
  })
  return this.save()
}

// Method to calculate totals
orderSchema.methods.calculateTotals = function() {
  this.pricing.subtotal = this.items.reduce((sum, item) => sum + item.total, 0)
  this.pricing.total = this.pricing.subtotal + this.pricing.tax + this.pricing.shipping - this.pricing.discount
  return this
}

module.exports = mongoose.model('Order', orderSchema)
